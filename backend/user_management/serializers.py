import json

from rest_framework import serializers

from user_management.models import Prompts
import json

class PromptSerializer(serializers.ModelSerializer):
    subjects = serializers.SerializerMethodField(read_only=True)
    # filters = FilterSerializer(many=True,)
    #
    # def create(self, validated_data):
    #     filters = validated_data.pop('filters')
    #     prompt = Prompts.objects.create(**validated_data)
    #     for filter in filters:
    #         Filters.objects.create(prompt = prompt, **filter)
    #     return prompt

    def get_subjects(self, obj):
        return json.loads(obj.subjects)


    class Meta:
        model = Prompts
        fields = "__all__"
