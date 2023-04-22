from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', views.ChatAPIView, basename='chat')

urlpatterns = router.urls + [
    path("", views.index, name="index"),
    path("<str:room_name>/", views.room, name="room"),
]