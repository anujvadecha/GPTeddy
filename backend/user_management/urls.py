from rest_framework import routers

from user_management.views import OrganizationAPIView, PromptAPIView

router = routers.DefaultRouter()
router.register(r'organizations', OrganizationAPIView, basename='organizations')
router.register(r'prompts', PromptAPIView, basename='prompts')

urlpatterns=[

] + router.urls