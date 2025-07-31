from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info' , {'fields' : ('vector_user',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional Info' , {'fields' : ('vector_user',)}),
    )

admin.site.register(CustomUser, CustomUserAdmin)