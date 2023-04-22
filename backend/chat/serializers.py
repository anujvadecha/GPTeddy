from chat.models import ChatModel

from rest_framework import serializers


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatModel
        fields = '__all__'