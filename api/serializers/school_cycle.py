from rest_framework import serializers
from api.models import SchoolCycle


class SchoolCycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolCycle
        fields = '__all__'


class SchoolCycleRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = SchoolCycle
        fields = (
            'year',               
        )