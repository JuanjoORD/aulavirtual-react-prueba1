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

from api.models import SchoolCycle
from api.serializers import SchoolCycleSerializer, SchoolCycleRegisterSerializer
from django.db import transaction


class SchoolCycleViewset(viewsets.ModelViewSet):    
    queryset = SchoolCycle.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("year",)
    search_fields = ("year",)
    ordering_fields = ("year",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return SchoolCycleSerializer
        else:
            return SchoolCycleRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    @action(methods=["get"], detail=False)
    def current(self, request):           
        try:                                    
            with transaction.atomic():

                _school_cycle = SchoolCycle.objects.filter(activo=True).last()
                _data = SchoolCycleSerializer(_school_cycle)

                return Response({"school_cycle": _data.data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)