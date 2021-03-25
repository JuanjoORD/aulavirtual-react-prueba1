from rest_framework import serializers
from api.models import Section


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class SectionRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = Section
        fields = (
            'name',                       
        )