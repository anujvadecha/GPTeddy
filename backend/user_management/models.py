# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser
from django.db import models

from base.models import BaseModel


class User(AbstractUser):

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)




class Prompts(BaseModel):
    personality = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,  blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    subjects = models.CharField(max_length=512, blank=True, null=True)
    message_count = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.personality

    class Meta:
        ordering = ["-created_at"]

