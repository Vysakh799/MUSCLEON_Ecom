from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
import pandas as pd
from .vectorizer import vectorize_data
import json
from .models import *



class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email', 'password','vector_user']
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        user_data = [{
            'user_id' : user.id,
            'product' : '',
            'search' : ''
        }]
        df = pd.DataFrame(user_data)
        user_vectores = vectorize_data(df)
        user.vector_user = json.dumps(user_vectores[0].tolist())
        user.save()
        return user
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    