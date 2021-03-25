import json

from django.db import transaction
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Grade, Section, Course, SchoolCycle, Assignment, AssignmentProfessor
from api.serializers import AssignmentRegisterSerializer, AssignmentSerializer


class AssignmentViewset(viewsets.ModelViewSet):
    queryset = Assignment.objects.filter(activo=True)

    '''
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("name",)
    ordering_fields = ("name",)
    '''

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AssignmentSerializer
        else:
            return AssignmentRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    #@action(methods=["post"], detail=False)
    def create(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                print("DATA ASIGNATURAS:", data)
                if len(data) > 0:                    

                    _school_cycle = SchoolCycle.objects.filter(activo=True).last()

                    assignment_list = [
                        Assignment(                            
                            description=assignment_i.get('description', ""),
                            grade=Grade.objects.get(id=assignment_i.get("grade")),
                            section=Section.objects.get(id=assignment_i.get("section")),
                            schoolcycle=_school_cycle,
                            course=Course.objects.get(id=assignment_i.get("course"))

                        ) for assignment_i in data
                    ]
                    print("Array asignaturas:", assignment_list)                    

                    assignment_created = Assignment.objects.bulk_create(assignment_list)
                    
                    return Response({"grade": "All assignments created succesfully"}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data or empty array"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to create assignment"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, *args, **kwargs):
        data = request.data        
        try:
            with transaction.atomic():
                cover = data.get("cover")
                data = json.loads(data.get("data"))
                print("my assignment:", data)
                print("my assignment:", cover)

                _course = data.get("course")
                _section = data.get("section")
                _grade = data.get("grade")
                _id = data.get("id")

                if _course is not None and _section is not None and _grade is not None and _id is not None:

                    _school_cycle = SchoolCycle.objects.last()                    

                    my_assignment = Assignment.objects.get(id=_id)
                    my_section = Section.objects.get(id=_section)
                    my_course = Course.objects.get(id=_course)
                    my_grade = Grade.objects.get(id=_grade)

                    my_assignment.grade = my_grade
                    my_assignment.section = my_section
                    my_assignment.course = my_course
                    my_assignment.description = data.get("description", my_assignment.description)

                    if cover is not None:
                        my_assignment.cover = File(cover)
                    
                    my_assignment.save()
                    
                    return Response({"assignment": "All assignments created succesfully"}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data or empty array"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to create assignment"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
        
        