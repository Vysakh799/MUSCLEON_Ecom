from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    vector_user = models.JSONField(null=True,blank=True)


