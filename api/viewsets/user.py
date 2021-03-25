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

from api.models import Profile
from api.serializers import UserSerializer, UserReadSerializer
from django.db import models, transaction
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.utils import timezone
from datetime import datetime
import jwt

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token" or self.action == "check_email" or self.action == "recover_password":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        usuario = User.objects.get(username=request.data["username"])
        usuario.set_password(request.data["password"])
        usuario.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        try:            
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            user = request.user
            if user.username != data["username"]:
                try:
                    User.objects.get(username=data["username"])
                    return Response(
                        {"detail": "the chosen username in not available, please pick another"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except User.DoesNotExist:
                    pass
            user.username = data["username"]
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            if profile is not None:
                perfil.phone = profile.get("phone", perfil.phone)
                perfil.address = profile.get("address", perfil.address)
                perfil.gender = profile.get("gender", perfil.gender)
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)                        
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(username=data["username"])
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)
    

    @action(methods=["post"], detail=False)
    def total_users(self, request):           
        try:                                    
            with transaction.atomic():

                _users = User.objects.all()\
                    .aggregate(
                        students = models.Count(
                            'profile__role',
                            filter=models.Q(profile__role=3, profile__activo=True)
                        ),
                        professors = models.Count(
                            'profile__role',
                            filter=models.Q(profile__role=2, profile__activo=True)
                        ),
                        total = models.Count(
                            'id',                            
                        )
                    )

                return Response({"total_users": _users}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def change_password(self, request):
        data = request.data
        user = request.user
        try:
            with transaction.atomic():
                _password = data.get('password')
                
                print('DATA update_me:', data)

                if _password is not None and _password != "":
                    user_actual = User.objects.get(id=user.id)
                    profile_actual = Profile.objects.get(id=user.profile.id)

                    user_actual.set_password(_password)
                    profile_actual.password_changed = True

                    profile_actual.save()
                    user_actual.save()

                    return Response({"student": "Contraseña cambiada correctamente"}, status=status.HTTP_200_OK)                
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create student"}, status=status.HTTP_400_BAD_REQUEST)                                                     
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    

    @action(methods=["post"], detail=False)
    def check_email(self, request):
        data = request.data
        try:
            with transaction.atomic():
                print('DATA recover_password:', data)
                user = None
                try:
                    user = User.objects.get(email=data.get("email"))
                except User.DoesNotExist:
                    user = None
                    return Response({"detail": "El correo electronico no pertene a ningun usuario del sistema"}, status=status.HTTP_400_BAD_REQUEST)


                if user is not None:
                    myTime = datetime.now()
                    dataEncode = {
                        "username": user.username,
                        "pk": user.id,
                        "time": str(myTime)
                    }
                    
                    encoded = jwt.encode(dataEncode, settings.RESTORE_PASSWORD_KEY, algorithm="HS256")
                    
                    subject = 'Recuperación de contraseña: VirtualClass'
                    content = f'<html><body><h2>Hola <u>{user.first_name}</u>, este es un correo de recuperación de contraseña.</h2>'
                    content += '<h3>Para cambiar tu contraseña, por favor da <strong>click</strong> sobre el enlace de abajo:</h3>'
                    content += f'<h4><a href="http://0.0.0.0:8080/#/restore_password/{encoded}" target="_blank">Click aquí para cambiar contraseña</a><h4>'
                    content += '<h3>Si no fuiste tu quien solicito este cambio, por favor ignora la indicación anterior.<br/>'
                    content += 'Y procura cambiar tu contraseña desde tu cuenta, la cual se encuetra en el icono superior derecho en la opción'
                    content += ' <u>Contraseña.</u><h3></html></body>'

                    message = EmailMultiAlternatives(
                        subject,
                        '',
                        settings.EMAIL_HOST_USER,
                        ['juanjo97.ord@gmail.com']
                    )

                    message.attach_alternative(content, 'text/html')
                    message.send()
                    
                    return Response({"detail": "Correo verificado, por favor revise su correo electronico y siga las instrucciones"}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def recover_password(self, request):
        data = request.data        
        try:
            with transaction.atomic():
                print('DATA recover_password:', data)
                dataEncoded = data.get("token")
                newPassword = data.get("password")

                if dataEncoded is not None and newPassword is not None:
                    dataDecoded = None
                    try:
                        dataDecoded = jwt.decode(dataEncoded, settings.RESTORE_PASSWORD_KEY, algorithms=["HS256"])
                    except jwt.exceptions.DecodeError:
                        return Response({"detail": "Token invalido, no accedio desde una URL válida"}, status=status.HTTP_400_BAD_REQUEST)

                    timeNow = datetime.now()
                    timeSaved = datetime.strptime(dataDecoded.get("time"), '%Y-%m-%d %H:%M:%S.%f')
                    result = timeNow - timeSaved
                    print("DATA RESULT TIME:", result.seconds)

                    user = None
                    idUser = dataDecoded.get("pk")

                    #if(idUser is None):
                    print("EL PK PRRO:", idUser)
                    
                    try:
                        user = User.objects.get(id=idUser)
                    except User.DoesNotExist:
                        user = None
                    
                    if(result.seconds > 315):
                        return Response({"detail": "Lo siento el token a expirado, ya pasarón más de 5 minutos"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        user.set_password(newPassword)
                        user.save()
                        return Response({"detail": "Su contraseña ha sido actualizada, ya puede iniciar sesión"}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                

                return Response({"detail": "Somenthing was wrong, its no possible to create student"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def restore_user(self, request):
        data = request.data
        user = request.user
        try:
            with transaction.atomic():
                
                print('DATA restore_user:', data)

                if True:                                   
                    return Response({"restore_user": "alshait compita"}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create student"}, status=status.HTTP_400_BAD_REQUEST)                                                     
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
