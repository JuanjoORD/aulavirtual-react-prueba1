from rest_framework import serializers
from api.models import Profession


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = '__all__'


class ProfessionRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = Profession
        fields = (
            'name',            
        )