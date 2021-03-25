from rest_framework import serializers
from api.models import ClassMaterial


class ClassMaterialSerializer(serializers.ModelSerializer):         

    class Meta:
        model = ClassMaterial
        fields = "__all__"        


class ClassMaterialRegisterSerializer(serializers.ModelSerializer):     

    class Meta:
        model = ClassMaterial
        fields = (
            'title',
            'description',
            'myfile',
            'assignment',
        )