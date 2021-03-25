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

from api.models import Event, Profile, SchoolCycle
from api.serializers import EventRegisterSerializer, EventSerializer
from django.db import transaction


class EventViewset(viewsets.ModelViewSet):    
    queryset = Event.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("title",)
    search_fields = ("title",)
    ordering_fields = ("title",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EventSerializer
        else:
            return EventRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        try:
            with transaction.atomic():
                is_valid = EventRegisterSerializer(data)
                            
                
                if is_valid:
                    _title = data.get("title")
                    _description = data.get("description")
                    _date = data.get("date")
                    _school_cycle = SchoolCycle.objects.filter(activo=True).last()
                    _profile = None
                    try:
                        _profile = Profile.objects.get(user=user.id, activo=True)
                    except Profile.DoesNotExist:
                        _profile = None

                    _event = Event.objects.create(
                        title=_title,
                        description=_description,
                        date=_date,
                        schoolcycle=_school_cycle,
                        profile=_profile
                    )

                    _event.save()                    
                    return Response({"event": "Evento registrado"}, status=status.HTTP_200_OK)                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create student"}, status=status.HTTP_400_BAD_REQUEST)                                       
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
        

    def update(self, request, pk):
        data = request.data
        user = request.user
        try:
            with transaction.atomic():
                is_valid = EventRegisterSerializer(data)
                            
                
                if is_valid:
                    _title = data.get("title")
                    _description = data.get("description")
                    _date = data.get("date")
                    _school_cycle = SchoolCycle.objects.filter(activo=True).last()
                    _profile = None

                    _event = Event.objects.get(id=pk, activo=True)

                    try:
                        _profile = Profile.objects.get(user=user.id, activo=True)
                    except Profile.DoesNotExist:
                        _profile = _event.profile

                    _event.title = _title
                    _event.description = _description
                    _event.date = _date
                    _event.schoolcycle = _school_cycle
                    _event.profile = _profile

                    _event.save()                    
                    return Response({"event": "Evento actualizado"}, status=status.HTTP_200_OK)                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create student"}, status=status.HTTP_400_BAD_REQUEST)                                       
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["get"], detail=False)
    def event_home_student(self, request):           
        try:                                    
            with transaction.atomic():

                def order_assign(assign):
                    return assign.get('section').get('name') and assign.get('grade').get('name')

                _event = Event.objects.filter(activo=True).order_by("-date")[:10]
                _event_serializer = EventSerializer(_event, many=True)                

                return Response({"event": _event_serializer.data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)