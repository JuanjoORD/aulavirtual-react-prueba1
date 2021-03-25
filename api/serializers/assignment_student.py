from rest_framework import serializers
from api.models import AssignmentStudent


class AssignmentStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentStudent
        fields = '__all__'
        depth = 1


class AssignmentStudentRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = AssignmentStudent
        fields = (
            'assignment',
            "student",
        )