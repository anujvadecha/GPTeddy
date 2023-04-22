from rest_framework import serializers

from user_management.models import Prompts, Filters


class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filters
        fields = "__all__"


class PromptSerializer(serializers.ModelSerializer):
    filters = FilterSerializer(many=True,)

    def create(self, validated_data):
        filters = validated_data.pop('filters')
        prompt = Prompts.objects.create(**validated_data)
        for filter in filters:
            Filters.objects.create(prompt = prompt, **filter)
        return prompt

    class Meta:
        model = Prompts
        fields = ('prompt', 'filters')
