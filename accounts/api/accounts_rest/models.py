from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    avatar = models.URLField(
        max_length=200,
        blank=True,
        null=True,
    )
    is_technician = models.BooleanField(default=False)
