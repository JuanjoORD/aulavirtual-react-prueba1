from rest_framework import serializers
from api.models import Homework, HomeworkStudent
from .homework_student import HomeworkStudentSerializer


class HomeworkSerializer(serializers.ModelSerializer):
    homeworkstudent_homework = HomeworkStudentSerializer(required=False, many=True)
    class Meta:
        model = Homework
        fields = '__all__'


class HomeworkRegisterSerializer(serializers.ModelSerializer):    

    class Meta:
        model = Homework
        fields = (
            'title',
            'description',
            'myvalue',
            'attached',
            'date_delivery',
            'assignment'
        )