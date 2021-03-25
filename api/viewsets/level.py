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

from api.models import Level, Grade
from api.serializers import LevelSerializer, LevelRegisterSerializer
from django.db.models import Q
from django.db import transaction


class LevelViewset(viewsets.ModelViewSet):    
    queryset = Level.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("name",)
    ordering_fields = ("name",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return LevelSerializer
        else:
            return LevelRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    def gradeNotAdded(self, request, pk, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():                
                            
                
                if True:
                    gradesNotAdded = Grade.objects.filter(id=pk)
                    
                    return Response({"student": 'alshait gradeNotAdded'}, status=status.HTTP_200_OK)                 
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data for get gradesNotAdded"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to get gradesNotAdded"}, status=status.HTTP_400_BAD_REQUEST)                                       
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def taste(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                _level = data.get('level')  
                print("MI LEVEL CTM:", _level)                              
            
                if _level is not None:

                    grades_in_level = Level.objects.filter(id=_level)                                    

                    #gradeJson = serializers.serialize("json", grades_in_level)
                    gradeJson = LevelSerializer(grades_in_level)
                    
                    print("grade serializaer:", gradeJson)                    
                    return Response({"grades inLevel": gradeJson.data}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to create grades"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)