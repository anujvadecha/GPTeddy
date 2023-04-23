import json

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.decorators import action

from GHackBase.settings import default_prompt
from user_management.serializers import PromptSerializer

from user_management.models import Prompts
import json

# Create your views here.
class OrganizationAPIView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='organization-list', url_name='organization-list')
    def get(self, request):
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)


class PromptAPIView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='update_prompt', url_name='update_prompt')
    def post(self, request):
        data = request.data
        data["user"] = request.user.id
        # List to comma seperated string
        print(data['subjects'])
        data["subjects"] = json.dumps(data["subjects"])
        serializer = PromptSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='get_prompt', url_name='get_prompt')
    def get(self, request):
        print(request.user)
        prompt = Prompts.objects.filter(user=request.user.id).first()
        if prompt is None:
            data = {"name": request.user.username, "subjects": ["Math", "History", "Science"],}
            prompt = default_prompt(request.user.username, 14)
            prompt = Prompts.objects.create(personality=prompt, user=request.user, subjects=data["subjects"])
        serializer = PromptSerializer(prompt)
        data = serializer.data
        data['subjects'] = json.loads(data['subjects'])
        return Response(data)


