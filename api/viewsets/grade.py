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

from api.models import Grade, Level, Section
from api.serializers import GradeSerializer, GradeRegisterSerializer

from django.core import serializers


class GradeViewset(viewsets.ModelViewSet):
    queryset = Grade.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("name",)
    ordering_fields = ("name",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return GradeSerializer
        else:
            return GradeRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    
    def create(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                _delete = data.get("delete")
                _add = data.get("add")
                _level = data.get('level')                              
            
                if _level is not None and _add is not None and _delete is not None:
                    print("DELETE:", _delete)
                    print("LEVEL:", _level)
                    print("ADD:", _add)

                    if len(_add) > 0:
                        level_get = Level.objects.get(id=_level)                    
                        
                        grade_list = [
                            Grade(
                                name=grade_item.get('name'),
                                description=grade_item.get('description'),
                                level=level_get
                            ) for grade_item in _add
                        ]

                        grade_created = Grade.objects.bulk_create(grade_list)

                    if len(_delete) > 0:
                        gradesToDelete = Grade.objects.filter(id__in=_delete)                        

                        for toDelete in gradesToDelete:
                            toDelete.delete()
                            toDelete.save()                            
                            print("toDelete", toDelete.name)

                                        
                    return Response({"grade": "All grades created succesfully"}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to create grades"}, status=status.HTTP_400_BAD_REQUEST)                
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def saveOnlyOne(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                _level = data.get('level')                
                _name = data.get('name')
                _description = data.get('description')
            
                if _level is not None and _name is not None and _description is not None:

                    level = Level.objects.get(id=_level)

                    grade = Grade.objects.create(
                        level=level,
                        name=_name,
                        description=_description
                    )

                    grade.save()

                    gradeJson = GradeSerializer(grade)                    
                    return Response({"grade": gradeJson.data}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to create grades"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def inLevel(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                _level = data.get('level')  
                print("MI LEVEL CTM:", _level)                              
            
                if _level is not None:

                    grades_in_level = Grade.objects.filter(level=_level, activo=True)                                    

                    #gradeJson = serializers.serialize("json", grades_in_level)
                    gradeJson = GradeSerializer(grades_in_level, many=True)
                    
                    print("grade serializaer:", gradeJson.data)
                    return Response({"grades": gradeJson.data}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to create grades"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["get"], detail=False)
    def total_grades_sections(self, request):           
        try:                                    
            with transaction.atomic():

                _grades = Grade.objects.filter(activo=True).count()
                _sections = Section.objects.filter(activo=True).count()

                return Response({"total_grades": _grades, "total_sections": _sections}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)