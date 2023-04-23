from chat.models import ChatModel
from rest_framework import serializers
from chat.models import ChatUser
from pdfprompts.pinecone_pdf import embed_pdf

message = "hello"


class ChatSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)

    def get_image_url(self, obj):
        if obj.from_user == ChatUser.user:
            return "https://gptteddy.blob.core.windows.net/images/kid.jpeg"
        else:
            return "https://gptteddy.blob.core.windows.net/images/image_181.png"

    class Meta:
        model = ChatModel
        fields = ('message', 'from_user', 'created_at', 'image_url')

from rest_framework import serializers
from .models import PDFFile

class PDFFileSerializer(serializers.ModelSerializer):

    def save(self, validated_data):
        print("create pdf called")
        obj = super().save(**validated_data)
        embed_pdf([obj.file.path])
        return obj

    class Meta:
        model = PDFFile
        fields = '__all__'
