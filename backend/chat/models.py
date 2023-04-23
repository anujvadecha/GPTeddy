from django.db import models

from base.models import BaseModel
from user_management.models import User
from djchoices import DjangoChoices, ChoiceItem


from django.db import models

class PDFFile(models.Model):
    file = models.FileField(upload_to='pdf_files/')
    upload_date = models.DateTimeField(auto_now_add=True)


class ChatUser(DjangoChoices):
    user = ChoiceItem("user")
    teddy = ChoiceItem("teddy")


# Create your models here.
class ChatModel(BaseModel):
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    from_user = models.CharField(max_length=255, blank=True, null=True, choices=ChatUser.choices, default=ChatUser.teddy)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ["-created_at"]