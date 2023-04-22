from rest_framework import serializers

from user_management.models import Prompts
import json

class PromptSerializer(serializers.ModelSerializer):
    # filters = FilterSerializer(many=True,)
    #
    # def create(self, validated_data):
    #     filters = validated_data.pop('filters')
    #     prompt = Prompts.objects.create(**validated_data)
    #     for filter in filters:
    #         Filters.objects.create(prompt = prompt, **filter)
    #     return prompt
    subjects = serializers.SerializerMethodField(read_only=True)
    
    def get_subjects(self,obj):
        print(obj.subjects)
        return json.loads(obj.subjects)
    
    class Meta:
        model = Prompts
        fields = "__all__"
