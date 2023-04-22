from rest_framework import routers

from user_management.views import OrganizationAPIView

router = routers.DefaultRouter()
router.register(r'organizations', OrganizationAPIView, basename='organizations')

urlpatterns=[

] + router.urls