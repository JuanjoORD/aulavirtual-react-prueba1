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

from api.models import Profession
from api.serializers import ProfessionSerializer, ProfessionRegisterSerializer


class ProfessionViewset(viewsets.ModelViewSet):   
    queryset = Profession.objects.filter(activo=True) 

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("name",)
    ordering_fields = ("name",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProfessionSerializer
        else:
            return ProfessionRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]