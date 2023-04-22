from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from user_management.models import User


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        print("User created")
    print(instance)

