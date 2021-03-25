from rest_framework import serializers
from api.models import HomeworkStudent


class HomeworkStudentSerializer(serializers.ModelSerializer):         

    class Meta:
        model = HomeworkStudent
        fields = '__all__'
        depth = 3     


class HomeworkStudentRegisterSerializer(serializers.ModelSerializer):      

    class Meta:
        model = HomeworkStudent
        fields = (
            'text',
            'homework',            
        )