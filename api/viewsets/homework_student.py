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

from api.models import HomeworkStudent, Homework, Student, Profile
from api.serializers import HomeworkStudentRegisterSerializer, HomeworkStudentSerializer
from django.db import transaction


class HomeworkStudentViewset(viewsets.ModelViewSet):    
    queryset = HomeworkStudent.objects.filter(activo=True)
    '''
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("name",)
    ordering_fields = ("name",)
    '''

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return HomeworkStudentSerializer
        else:
            return HomeworkStudentRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    def create(self, request):
        data = request.data
        print('DATA HOMEWORK STUDENT CREATE:', data)        
        try:                                    
            with transaction.atomic():
                myuser = request.user
                myfile = data.get("myfile")
                data = json.loads(data.get("data"))                

                is_valid = HomeworkStudentRegisterSerializer(data)
                       
                if is_valid:
                    print("DATA OF data:", data)
                    print("DATA OF myfile:", myfile)

                    _id_homework = data.get("homework")
                    _text = data.get("text")
                    _homework = Homework.objects.get(id=_id_homework, activo=True)
                    _profile = Profile.objects.get(user=myuser.id, activo=True)
                    _student = Student.objects.get(profile=_profile.id, activo=True)

                    _homework_student = HomeworkStudent.objects.create(
                        homework=_homework,
                        student=_student,                        
                        text=_text
                    )

                    if myfile is not None:
                        _homework_student.myfile = File(myfile)

                    _homework_student.save()

                    send_data = HomeworkStudentSerializer(_homework_student)
                    
                    return Response({"homework_student": send_data.data}, status=status.HTTP_200_OK)                  
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    
    def update(self, request, pk):
        data = request.data
        myuser = request.user
        print('DATA HOMEWORK STUDENT UPDATE:', data)        
        try:                                    
            with transaction.atomic():
                myfile = data.get("myfile")
                data = json.loads(data.get("data"))

                is_valid = HomeworkStudentRegisterSerializer(data)
                       
                if is_valid:
                    print("DATA OF data:", data)
                    print("DATA OF myfile:", myfile)                    

                    _id_homework = data.get("homework")
                    _text = data.get("text")                    

                    _homework_student = HomeworkStudent.objects.get(id=pk, activo=True)

                    _homework_student.text = _text

                    if myfile is not None and _homework_student.myfile is not None:
                        _homework_student.myfile.delete()
                        _homework_student.myfile = File(myfile)
                    
                    _homework_student.save()
                    send_data = HomeworkStudentSerializer(_homework_student)
                    
                    return Response({"homework_student": send_data.data}, status=status.HTTP_200_OK)                  
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def homework_note(self, request):
        data = request.data               
        try:                                    
            with transaction.atomic():
                _homework_id = data.get("homework")                
                       
                if _homework_id is not None:
                    print("DATA OF homework_note data:", data)
                    _all_homework = HomeworkStudent.objects.filter(homework=_homework_id, activo=True)

                    send_data = HomeworkStudentSerializer(_all_homework, many=True)
                    return Response({"homework_student": send_data.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def read_homework_note(self, request):
        data = request.data               
        try:                                    
            with transaction.atomic():
                _homework_id = data.get("homework")
                _student_id = data.get("student")
                       
                if _homework_id is not None and _student_id is not None:
                    print("DATA OF homework_note data:", data)
                    _homework_student = None
                    try:
                        _homework_student = HomeworkStudent.objects.get(homework=_homework_id, student=_student_id, activo=True)
                    except HomeworkStudent.DoesNotExist:
                        _homework_student = None
                    
                    response = None
                    if _homework_student is not None:
                        send_data = HomeworkStudentSerializer(_homework_student)
                        response = send_data.data

                    return Response({"homework_student": response}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def qualify_homework(self, request):
        data = request.data               
        try:                                    
            with transaction.atomic():
                _homework_id = data.get("homework")
                _student_id = data.get("student")
                _points = data.get("points")
                       
                if _homework_id is not None and _student_id is not None and _points is not None:
                    print("DATA OF qualify_homework data:", data)
                                        
                    _homework_student = HomeworkStudent.objects.get(homework=_homework_id, student=_student_id, activo=True)
                    _homework_student.points = _points
                    _homework_student.save()

                    return Response({"homework_student": "Tarea calificada correctamente"}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)