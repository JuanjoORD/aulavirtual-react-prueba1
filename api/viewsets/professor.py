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

from api.models import Professor, Profile, Profession, Role
from api.serializers import ProfessorRegisterSerializer, ProfessorSerializer, AssignmentProfessorSerializer, AssignmentSerializer
from django.db.models import Q


class ProfessorViewset(viewsets.ModelViewSet):
    queryset = Professor.objects.filter(activo=True)

    #filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    #filter_fields = ("name",)
    #search_fields = ("name",)
    #ordering_fields = ("name",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProfessorSerializer
        else:
            return ProfessorRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    #@action(methods=["post"], detail=False)
    def create(self, request, *args, **kwargs):
        data = request.data
        print('DATA PROFESSOR:', data)
        try:
            with transaction.atomic():
                avatar = data.get("avatar")
                data = json.loads(data.get("data"))

                _profile = data.get('profile')
                _profession = data.get('profession')
                _user = data.get('user')
                _role = data.get('role')

                print('CREAR PROF:', data)
                print('CREAR PROF AVATAR:', avatar)

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
            
                if _profile is not None and _profession is not None and _user is not None and _role is not None:

                    user_c = User.objects.create(
                        username = _user.get('username'),
                        first_name = _user.get('first_name'),
                        last_name = _user.get('last_name'),
                        email=_user.get("email")
                    )
                    user_c.set_password(_user.get('password'))         

                    role_c = Role.objects.get(id=_role)           

                    profile_c = Profile.objects.create(
                        user=user_c, 
                        role=role_c,
                        phone=_profile.get("phone"),
                        address=_profile.get("address"),
                        gender=_profile.get("gender")                        
                    )                    

                    if avatar is not None:
                        profile_c.avatar = File(avatar)

                    profession_c = Profession.objects.get(id=_profession)

                    professor_c = Professor.objects.create(profile=profile_c, profession=profession_c)

                    user_c.save()
                    profile_c.save()
                    professor_c.save()

                    my_serializer = ProfessorSerializer(professor_c)
                    return Response({"professor": my_serializer.data}, status=status.HTTP_200_OK)                  
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, pk):
        data = request.data
        print('DATA PROFESSOR UPDATE:', data)        
        try:                                    
            with transaction.atomic():
                avatar = data.get("avatar")
                data = json.loads(data.get("data"))

                _profile = data.get('profile')
                _profession = data.get('profession')
                _user = data.get('user')
                _role = data.get('role')    

                myuser = request.user
                print('CREAR PROF:', data)
                print('CREAR PROF AVATAR:', avatar)            
                print('CREAR PROF AVATAR:', _user)  
                       
                if _profile is not None and _profession is not None and _user is not None and _role is not None:

                    professor_actual = Professor.objects.get(id=pk)                    
                    profile_actual = Profile.objects.get(id=professor_actual.profile_id)                    
                    user_actual = User.objects.get(id=profile_actual.user_id)

                    if user_actual.username != _user.get('username'):
                        try:
                            User.objects.get(username=_user.get('username'))
                            return Response(
                                {"detail": "the chosen username in not available, please pick another"},
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

                    profile_actual.phone = _profile.get('phone', profile_actual.phone)                           
                    profile_actual.address = _profile.get('address', profile_actual.address)
                    profile_actual.gender = _profile.get('gender', profile_actual.gender)                    
                    profile_actual.avatar.delete(save=True)

                    if avatar is not None:
                        profile_actual.avatar = File(avatar)                  

                    my_profession = Profession.objects.get(id=_profession)

                    professor_actual.profession = my_profession

                    user_actual.save()
                    profile_actual.save()
                    professor_actual.save()

                    my_serializer = ProfessorSerializer(professor_actual)
                    return Response({"professor": my_serializer.data}, status=status.HTTP_200_OK)                  
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def pending_homework(self, request):           
        try:                                    
            with transaction.atomic():

                _assign_professor = request.user.profile.professor.assignprofessor_professor.filter(activo=True)

                hw_pending = []
                total_pending = 0
                for a in _assign_professor:
                    _assignment = a.assignment
                    _pendingCount = _assignment.homework_assignment.filter(
                                    activo=True
                                ).aggregate(
                                    pending = models.Count(
                                            'homeworkstudent_homework__id',
                                            filter=Q(homeworkstudent_homework__points=None)
                                    )                                    
                                )
                    data = {
                        'assign_name': _assignment.course.name + ', ' + _assignment.grade.name + ', ' +_assignment.section.name,
                        'pending': _pendingCount.get('pending'),
                        'assign_id': _assignment.id
                    }

                    hw_pending.append(data)
                    total_pending += _pendingCount.get('pending')

                return Response({"professor": hw_pending, "total": total_pending}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
        

    @action(methods=["post"], detail=False)
    def assign_professor_home(self, request):           
        try:                                    
            with transaction.atomic():                

                _assing_professor = request.user.profile.professor.assignprofessor_professor.filter(activo=True)
                
                _assingments = []
                for assignment in _assing_professor:
                    serializer = AssignmentSerializer(assignment.assignment)
                    _assingments.append(serializer.data)

                return Response({"professor": _assingments}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    