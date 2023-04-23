from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import PDFFile
from .serializers import PDFFileSerializer
from GHackBase.settings import cohere_api_key_free, default_prompt, class_index, context_index
from chat.models import ChatModel, ChatUser
from chat.serializers import ChatSerializer
from rest_framework.response import Response

from pdfprompts.pinecone_pdf import embed_pdf, process_pdf
from user_management.models import Prompts
from channels.layers import get_channel_layer
from pdfprompts.cohere_client import prompt_no_pdf, query_pinecone, pdf_prompt
import rest_framework.status
class ChatAPIView(viewsets.ViewSet):

    @action(methods=['post'], detail=False, url_path="speak", url_name="speak",)
    def words_spoken(self, request):
        import json
        from django.conf import settings
        import cohere
        # TODO Call Coherent API
        # TODO add response to database
        data = request.data
        user = request.user
        text = data["message"]
        prompt = Prompts.objects.filter(user=request.user).first()
        if prompt is None:
            data = {"name": request.user.username, "subjects": ["Math", "History", "Science"], }
            personality = default_prompt(name=request.user.username, age=14)
            prompt = Prompts.objects.create(personality=personality, user=request.user, subjects=json.dumps(data["subjects"]))
        age = prompt.age
        name = request.user.username
        subjects = json.loads(prompt.subjects)
        personality = prompt.personality
        if "bye" in text.lower():
            last_chat_request_id = None
            prompt.chat_request_id = last_chat_request_id
            prompt.save()
            chat_teddy = ChatModel.objects.create(user=user, message=f"Bye {user} , it was great talking to you. See you soon! Bear Hugs.", from_user=ChatUser.teddy)
            return Response(ChatSerializer(chat_teddy).data)

        last_chat_request_id = prompt.chat_request_id
        bot = cohere.Client(api_key=cohere_api_key_free)
        # TODO  prompt identification for pdfs
        top_k = 5
        res = query_pinecone(class_index, text, top_k=top_k)
        num_def = [x["metadata"]['Task'] for x in res.matches].count("Default")
        if num_def / top_k < 0.5:
            context_k = 5
            res = query_pinecone(context_index, text, top_k=context_k)
            pdf_context = [x[1] for x in sorted([(x['id'], x["metadata"]['Context']) for x in res.matches])]
        else:
            pdf_context = None
        if pdf_context:
            print("using pdf context")
            personality = pdf_prompt(name, age, subjects, pdf_context)
        else:
            print("using default context")
            personality = prompt_no_pdf(name, age, subjects)
        prompt.personality = personality
        prompt.save()
        print("Prompt", personality)
        res = bot.chat(query=text,
                       preamble_override=personality,
                       conversation_id=last_chat_request_id if last_chat_request_id else None,
                       )
        response_text = res.text
        if not last_chat_request_id:
            prompt.chat_request_id = res.conversation_id
            prompt.save()
        chat_user = ChatModel.objects.create(user=user, message=text, from_user=ChatUser.user)
        chat_teddy = ChatModel.objects.create(user=user, message=response_text, from_user=ChatUser.teddy)
        channel_layer = get_channel_layer()
        from asgiref.sync import async_to_sync
        data_to_send = [ ChatSerializer(chat_teddy).data, ChatSerializer(chat_user).data]
        async_to_sync(channel_layer.group_send)(
            'chat_teddy', {"type": "chat_message", "message": data_to_send}
        )
        return Response(ChatSerializer(chat_teddy).data)



class PDFFileViewSet(viewsets.ModelViewSet):
    queryset = PDFFile.objects.all()
    serializer_class = PDFFileSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        from rest_framework import status
        file = request.FILES.get('file')
        if file:
            pdf_file = PDFFile(file=file)
            pdf_file.save()
            process_pdf([pdf_file.file.path])
            serializer = PDFFileSerializer(pdf_file)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'No file found'}, status=status.HTTP_200_OK)



def index(request):
    return render(request, "chat/index.html")


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})