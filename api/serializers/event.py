from rest_framework import serializers
from api.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class EventRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = Event
        fields = (
            'title',
            'description',
            'date'
        )