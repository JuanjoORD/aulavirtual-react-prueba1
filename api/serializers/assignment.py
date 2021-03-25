from rest_framework import serializers
from api.models import Assignment

from .level import LevelSerializer
from .school_cycle import SchoolCycleSerializer
from .course import CourseSerializer
from .section import SectionSerializer
from .grade import GradeSerializer


class AssignmentSerializer(serializers.ModelSerializer):    
    schoolcycle = SchoolCycleSerializer(required=False)
    course = CourseSerializer(required=False)
    section = SectionSerializer(required=False)
    grade = GradeSerializer(required=False) 

    class Meta:
        model = Assignment
        fields = (
            'id',
            'cover',
            'description',
            'grade',
            'section',
            'schoolcycle',
            'course'
        )


class AssignmentRegisterSerializer(serializers.ModelSerializer):    
    schoolcycle = SchoolCycleSerializer(required=False)
    course = CourseSerializer(required=False)
    section = SectionSerializer(required=False)
    grade = GradeSerializer(required=False)

    class Meta:
        model = Assignment
        fields = (
            'cover',
            'description',
            'grade',
            'section',
            'schoolcycle',
        )