from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.decorators import action

from user_management.serializers import PromptSerializer

from backend.user_management.models import Prompts


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
        serializer = PromptSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='get_prompt', url_name='get_prompt')
    def get(self, request):
        prompt = Prompts.objects.filter(user=request.user.id).last()
        serializer = PromptSerializer(prompt)
        return Response(serializer.data)


