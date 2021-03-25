from rest_framework import serializers
from api.models import AssignmentProfessor


class AssignmentProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentProfessor
        fields = '__all__'

        depth = 2


class AssignmentProfessorRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = AssignmentProfessor
        fields = (
            'assignment',
            "professor",
        )

        depth = 1