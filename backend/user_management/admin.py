import django
from django.contrib import admin
from django.apps import apps
from django.contrib.admin import ModelAdmin

from django.contrib.auth.admin import UserAdmin as OrigUserAdmin

from user_management.models import Prompts

app = apps.get_app_config('user_management')


@admin.register(Prompts)
class PromptsAdmin(admin.ModelAdmin):
    pass