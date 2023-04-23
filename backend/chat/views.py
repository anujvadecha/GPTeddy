from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action

from GHackBase.settings import cohere_api_key_free
from chat.models import ChatModel, ChatUser
from chat.serializers import ChatSerializer
from rest_framework.response import Response

from user_management.models import Prompts


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
        age = prompt.age
        name = request.user.username
        subjects = json.loads(prompt.subjects)
        personality = prompt.personality

        if "bye" in text.lower():
            last_chat_request_id = None
            prompt.chat_request_id = last_chat_request_id
            prompt.save()
            chat_teddy = ChatModel.objects.create(user=user, message="STOP we have talked enough today", from_user=ChatUser.teddy)
            return Response(ChatSerializer(chat_teddy).data)

        last_chat_request_id = prompt.chat_request_id
        bot = cohere.Client(api_key=cohere_api_key_free)
        res = bot.chat(query=text,
                       preamble_override=personality,
                       conversation_id=last_chat_request_id if last_chat_request_id else None,
                       )
        response_text = res.text
        if not last_chat_request_id:
            prompt.chat_request_id = res.conversation_id
            prompt.save()
        chat_user = ChatModel.objects.create(user=user, message=data.get("message"), from_user=ChatUser.user)
        chat_teddy = ChatModel.objects.create(user=user, message=response_text, from_user=ChatUser.teddy)
        return Response(ChatSerializer(chat_teddy).data)


def index(request):
    return render(request, "chat/index.html")


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})