from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action

from chat.models import ChatModel, ChatUser
from chat.serializers import ChatSerializer


class ChatAPIView(viewsets.ViewSet):

    @action(methods=['post'], detail=False, url_path="speak", url_name="speak",)
    def words_spoken(self, request):
        #TODO Call Coherent API
        data = request.data
        user = request.user
        chat = ChatModel.objects.create(user=user, message=data.get("message"), from_user=ChatUser.user)
        return ChatSerializer(chat).data


def index(request):
    return render(request, "chat/index.html")


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})