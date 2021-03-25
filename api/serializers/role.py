from rest_framework import serializers
from api.models import Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class RoleRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = Role
        fields = (
            'name',                        
        )