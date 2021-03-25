import json

from django.db import transaction, models
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Student, Profile, Role
from api.serializers import (
    StudentSerializer, StudentRegisterSerializer, HomeworkSerializer, AssignmentSerializer,
    HomeworkStudentSerializer
)


class StudentViewset(viewsets.ModelViewSet):
    queryset = Student.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("card_id",)
    search_fields = ("card_id",)
    ordering_fields = ("card_id",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return StudentSerializer
        else:
            return StudentRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    #@action(methods=["post"], detail=False)
    def create(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                avatar = data.get("avatar")
                data = json.loads(data.get("data"))

                _profile = data.get('profile')                
                _user = data.get('user')
                _role = data.get('role')               
                _student = data.get('student')
                
                print('CREAR ESTUDIANTE:', data)
                print('CREAR ESTUDIANTE AVATAR:', avatar)

                try:
                    User.objects.get(username=_user.get('username'))
                    return Response(
                        {"detail": "El nombre de usuario no está disponible, por favor escoge otro"},
                        status=status.HTTP_406_NOT_ACCEPTABLE
                    )
                except User.DoesNotExist:
                    pass


                try:
                    User.objects.get(email=_user.get('email'))
                    return Response(
                        {"detail": "El correo electronico no está disponible, por favor escoge otro"},
                        status=status.HTTP_406_NOT_ACCEPTABLE
                    )
                except User.DoesNotExist:
                    pass
                            
                
                if _profile is not None and _user is not None and _role is not None and _student is not None:
                    
                    try:
                        User.objects.get(username=_user.get('username'))
                        return Response(
                            {"detail": "the chosen username in not available, please pick another"},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    except User.DoesNotExist:
                        pass

                    user_c = User.objects.create(
                        username = _user.get('username'),
                        first_name = _user.get('first_name'),
                        last_name = _user.get('last_name'),
                        email=_user.get("email")
                    )
                    user_c.set_password(_user.get('password'))         

                    role_c = Role.objects.get(id=_role)           

                    profile_c, created = Profile.objects.get_or_create(user=user_c, role=role_c)
                    profile_c.phone = _profile.get("phone", profile_c.phone)
                    profile_c.address = _profile.get("address", profile_c.address)
                    profile_c.gender = _profile.get("gender", profile_c.gender)

                    if avatar is not None:
                        profile_c.avatar = File(avatar)                                     

                    student_c = Student.objects.create(
                        card_id=_student.get('card_id'),
                        contact_name=_student.get('contact_name'),
                        contact_phone=_student.get('contact_phone'),
                        contact_address=_student.get('contact_address'),
                        profile=profile_c,
                    )

                    user_c.save()
                    profile_c.save()                    
                    student_c.save()

                    my_serializer = StudentSerializer(student_c)
                    return Response({"student": my_serializer.data}, status=status.HTTP_200_OK)                  
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                

                return Response({"detail": "Somenthing was wrong, its no possible to create student"}, status=status.HTTP_400_BAD_REQUEST)                                       
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk):
        data = request.data
        try:
            with transaction.atomic():
                avatar = data.get("avatar")
                data = json.loads(data.get("data"))

                _profile = data.get('profile')                
                _user = data.get('user')
                _role = data.get('role')               
                _student = data.get('student')
                
                print('CREAR ESTUDIANTE:', data)
                print('CREAR ESTUDIANTE AVATAR:', avatar)
                            
                
                if _profile is not None and _user is not None and _role is not None and _student is not None:
                    student_actual = Student.objects.get(id=pk)
                    profile_actual = Profile.objects.get(id=student_actual.profile_id)
                    user_actual = User.objects.get(id=profile_actual.user_id)

                    if user_actual.username != _user.get('username'):
                        try:
                            User.objects.get(username=_user.get('username'))
                            return Response(
                                {"detail": "El nombre de usuario no está disponible, por favor escoge otro"},
                                status=status.HTTP_400_BAD_REQUEST
                            )
                        except User.DoesNotExist:
                            pass
                    
                    if user_actual.email != _user.get('email'):
                        try:
                            User.objects.get(email=_user.get('email'))
                            return Response(
                                {"detail": "El correo electronico no está disponible, por favor escoge otro"},
                                status=status.HTTP_400_BAD_REQUEST
                            )
                        except User.DoesNotExist:
                            pass
                    
                    user_actual.username = _user.get('username', user_actual.username)
                    user_actual.first_name = _user.get('first_name', user_actual.first_name)
                    user_actual.last_name = _user.get('last_name', user_actual.last_name)
                    user_actual.email = _user.get('email', user_actual.email)

                    if _user.get("password") is not None and _user.get("password") != "":
                        user_actual.set_password(_user.get('password'))
                    
                    profile_actual.phone = _profile.get("phone", profile_actual.phone)
                    profile_actual.address = _profile.get("address", profile_actual.address)
                    profile_actual.gender = _profile.get("gender", profile_actual.gender)   

                    if avatar is not None:
                        profile_actual.avatar = File(avatar)                                                     

                    student_actual.card_id = _student.get('card_id'),
                    student_actual.contact_name = _student.get('contact_name')
                    student_actual.contact_phone = _student.get('contact_phone')
                    student_actual.contact_address = _student.get('contact_address')                    

                    user_actual.save()
                    profile_actual.save()                    
                    student_actual.save()

                    my_serializer = StudentSerializer(student_actual)
                    return Response({"student": my_serializer.data}, status=status.HTTP_200_OK)                
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create student"}, status=status.HTTP_400_BAD_REQUEST)                                                     
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def my_qualifications(self, request):
        _student = request.user.profile.student
        try:
            with transaction.atomic():
                myStudent = Student.objects.filter(
                        id=_student.id,
                        activo=True
                    ).prefetch_related(
                        'assignstudent_student'
                    )

                if myStudent[0] is not None:                    
                    queryStudent = StudentSerializer(_student)
                    dataStudent = queryStudent.data
                    

                    qualifications = {
                        'student': dataStudent,
                        'allAssign': []
                    }

                    for a_s in myStudent[0].assignstudent_student.filter(activo=True):
                        assign = a_s.assignment
                        homeworks = assign.homework_assignment.filter(activo=True)

                        oneAssignment = {
                            'assignment': {
                                "id": assign.id,
                                'name': assign.course.name + ", " + assign.grade.name +", "+assign.section.name
                            }
                        }

                        answers = []
                        total = 0

                        for hw in homeworks:
                            homeworkStudent = hw.homeworkstudent_homework.filter(activo=True, student=dataStudent.get('id'))
                            dataHomework = {
                                "id": hw.id,
                                "title": hw.title,
                                "description": hw.description,
                                "myvalue": hw.myvalue
                            }
                            
                            for h_s in homeworkStudent:
                                if(h_s.student == _student):
                                    data = {
                                        "homework": dataHomework,
                                        "points": h_s.points,
                                        "submitted": True
                                    }
                                    answers.append(data)
                                    if h_s.points is not None:
                                        total += float(h_s.points)
                                    else:
                                        total += 0
                                else:
                                    data = {
                                        "homework": dataHomework,
                                        "points": None,
                                        "submitted": False
                                    }
                                    answers.append(data)
                                    total += 0
                        
                        
                        oneAssignment["answers"] = answers
                        oneAssignment["total"] = total

                        qualifications.get("allAssign").append(oneAssignment)
                        

                    print("La DATONGA BROU:", qualifications)
                    
                    return Response({"student": qualifications}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create student"}, status=status.HTTP_400_BAD_REQUEST)                                                     
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    