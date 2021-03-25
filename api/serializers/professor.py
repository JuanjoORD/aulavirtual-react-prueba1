from rest_framework import serializers
from api.models import Professor, Profession, Profile
from .profession import ProfessionSerializer
from .user import ProfileSerializer


class ProfessorSerializer(serializers.ModelSerializer):
    #profile = ProfileSerializer(required=False)
    #profession = ProfessionSerializer(required=False)

    class Meta:
        model = Professor
        fields = (
            'id',
            'profile',
            'profession',
        )

        depth = 2


class ProfessorRegisterSerializer(serializers.ModelSerializer):    
    #profile = ProfileSerializer(required=False)
    profession = ProfessionSerializer(required=False, read_only=True)

    class Meta:
        model = Professor
        fields = (
            #'profile',            
            'profession',
        )