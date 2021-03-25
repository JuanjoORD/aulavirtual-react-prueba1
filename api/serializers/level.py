from rest_framework import serializers
from api.models import Level


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = '__all__'


class LevelRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = Level
        fields = (
            'name',            
        )