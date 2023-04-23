from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

from .views import PDFFileViewSet

router = DefaultRouter()
router.register(r'', views.ChatAPIView, basename='chat')
router.register(r'pdf-files', PDFFileViewSet, basename='pdf-files')

urlpatterns = router.urls + [
    path("", views.index, name="index"),
    path("<str:room_name>/", views.room, name="room"),
]