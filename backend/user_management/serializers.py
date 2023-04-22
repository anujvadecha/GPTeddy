import json

from rest_framework import serializers

from user_management.models import Prompts
import json

class PromptSerializer(serializers.ModelSerializer):
    # subjects = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Prompts
        fields = "__all__"
