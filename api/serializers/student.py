from rest_framework import serializers
from api.models import Student
from .user import ProfileSerializer, MyProfileSerializer, UserReadSerializer


class StudentSerializer(serializers.ModelSerializer):
    #profile = ProfileSerializer(required=False)    
    #profile = MyProfileSerializer(required=False, read_only=True)    

    class Meta:
        model = Student
        fields = (
            'id',
            'profile',
            'card_id',
            'contact_name',
            'contact_address',
            'contact_phone',            
        )
        depth = 2


class StudentRegisterSerializer(serializers.ModelSerializer):    
    profile = ProfileSerializer(required=False)    

    class Meta:
        model = Student
        fields = (
            'profile',                        
        )