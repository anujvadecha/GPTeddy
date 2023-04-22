# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser
from django.db import models

from base.models import BaseModel


class User(AbstractUser):

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)




class Prompts(BaseModel):
    prompt = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,  blank=True, null=True)

    def __str__(self):
        return self.prompt

    class Meta:
        ordering = ["-created_at"]


class Filters(BaseModel):
    filter = models.TextField(blank=True, null=True)
    value = models.CharField(max_length=512, blank=True, null=True)
    prompt = models.ForeignKey(Prompts, on_delete=models.CASCADE, related_name="filters", blank=True, null=True)

    def __str__(self):
        return self.filter

    class Meta:
        ordering = ["-created_at"]
