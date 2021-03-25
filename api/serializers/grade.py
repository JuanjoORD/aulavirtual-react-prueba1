from rest_framework import serializers
from api.models import Grade
from .level import LevelSerializer


class GradeSerializer(serializers.ModelSerializer):         

    class Meta:
        model = Grade
        fields = (
            'id',
            'name',
            'description',            
            'activo',
            'level'     
        )        


class GradeRegisterSerializer(serializers.ModelSerializer):    
    level = LevelSerializer(required=False)    

    class Meta:
        model = Grade
        fields = (
            'level',
            'name',
            'description'
        )