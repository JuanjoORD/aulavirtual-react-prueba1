import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Homework, Student, Profile, HomeworkStudent
from api.serializers import HomeworkRegisterSerializer, HomeworkSerializer, AssignmentSerializer
from django.db import transaction


class HomeworkViewset(viewsets.ModelViewSet):
    queryset = Homework.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("title",)
    search_fields = ("title",)
    ordering_fields = ("title",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return HomeworkSerializer
        else:
            return HomeworkRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]    
    

    @action(methods=["post"], detail=False)
    def upcoming_homework(self, request):           
        try:                                    
            with transaction.atomic():

                def get_date(homework):
                    return homework.get('hw').get('date_delivery')

                _student = request.user.profile.student
                _my_assignments = _student.assignstudent_student.filter(activo=True)

                _homework = []
                for i in _my_assignments:
                    _homework_temp = i.assignment.homework_assignment.filter(activo=True)
                    for h in _homework_temp:
                        homework_serializer = HomeworkSerializer(h)
                        data = {
                            'assignmentId': i.assignment.id,
                            'hw': homework_serializer.data
                        }
                        _homework.append(data)
                
                _homework.sort(key=get_date)

                return Response({"homework": _homework[:7]}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def assignstudent_home(self, request):           
        try:                                    
            with transaction.atomic():

                def order_assign(assign):
                    return assign.get('section').get('name') and assign.get('grade').get('name')

                _student = request.user.profile.student
                _my_assignments = _student.assignstudent_student.filter(activo=True)#.order_by(assignment_)

                _assign_home = []
                for i in _my_assignments:
                    _assing_temp = i.assignment
                    _assign_serializer = AssignmentSerializer(_assing_temp)
                    _assign_home.append(_assign_serializer.data)
                

                _assign_home.sort(key=order_assign)

                return Response({"homework": _assign_home}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)