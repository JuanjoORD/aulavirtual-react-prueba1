from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile

from .role import RoleSerializer


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class MyUserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )

class MyProfileSerializer(serializers.ModelSerializer):
    user = MyUserSerializer(required=False)
    role = RoleSerializer(required=False)
    class Meta:
        model = Profile
        fields = (   
            'phone',         
            'avatar',
            'address',
            'gender',
            'user',
            'role',
        )


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'profile',
            'password'
        )


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )
