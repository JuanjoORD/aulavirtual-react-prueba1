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

from api.models import ClassMaterial, Assignment, Homework, Student, HomeworkStudent, Profile
from api.serializers import (ClassMaterialRegisterSerializer, ClassMaterialSerializer, 
                                HomeworkRegisterSerializer, HomeworkSerializer,
                                HomeworkStudentSerializer
                            )
from django.db.models import Q, F
from django.db import transaction


class ClassMaterialViewset(viewsets.ModelViewSet):    
    queryset = ClassMaterial.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("title",)
    search_fields = ("title",)
    ordering_fields = ("title",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ClassMaterialSerializer
        else:
            return ClassMaterialRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    #@action(methods=["post"], detail=False)
    def create(self, request):
        data = request.data
        print('DATA MATERIAL CREATE:', data)        
        try:                                    
            with transaction.atomic():
                myfile = data.get("myfile")
                data = json.loads(data.get("data"))

                _title = data.get('title')
                _description = data.get('description')
                _assign_id = data.get("assignment")

                myuser = request.user                
                print('CREAR MYFILE MATERILA:', myfile)                
                       
                if _title is not None and _description is not None and _assign_id is not None:
                    
                    _assignment = Assignment.objects.get(id=_assign_id)

                    _material = ClassMaterial.objects.create(
                        title=_title,
                        description=_description,
                        assignment=_assignment    
                    )

                    if myfile is not None:
                        _material.myfile = File(myfile)
                    
                    _material.save()

                    _material_all = ClassMaterial.objects.filter(assignment=_assign_id, activo=True)
                    send_data = ClassMaterialSerializer(_material_all, many=True)
                    
                    return Response({"class_material": send_data.data}, status=status.HTTP_200_OK)                  
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    
    def update(self, request, pk):
        data = request.data
        print('DATA MATERIAL CREATE:', data)        
        try:                                    
            with transaction.atomic():
                myfile = data.get("myfile")
                data = json.loads(data.get("data"))

                _title = data.get('title')
                _description = data.get('description')
                _assign_id = data.get("assignment")                
                
                print('UPDATE MYFILE MATERILA:', myfile)
                print('DATA MYFILE MATERILA:', data)
                       
                if _title is not None and _description is not None and _assign_id is not None:
                    
                    _assignment = Assignment.objects.get(id=_assign_id)
                    _class_material = ClassMaterial.objects.get(id=pk)

                    _class_material.title = _title
                    _class_material.description = _description                    

                    if myfile is not None and _class_material.myfile is not None:
                        _class_material.myfile.delete()
                        _class_material.myfile = File(myfile)
                    
                    _class_material.save()

                    _material_all = ClassMaterial.objects.filter(assignment=_assign_id, activo=True)

                    send_data = ClassMaterialSerializer(_material_all, many=True)
                    
                    return Response({"class_material": send_data.data}, status=status.HTTP_200_OK)                  
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                

                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def deleteMaterial(self, request):
        data = request.data
        try:                                    
            with transaction.atomic():
                _assignment = data.get("assignment")
                _id = data.get("id")
                print("ID of destroy, class, assign", _id, _assignment)

                if _assignment is not None and _id is not None:
                    _material_to_del = ClassMaterial.objects.get(id=_id, activo=True)

                    if _material_to_del.myfile is not None:
                        _material_to_del.myfile.delete()
                    
                    _material_to_del.delete()

                    _material_all = ClassMaterial.objects.filter(assignment=_assignment, activo=True)

                    send_data = ClassMaterialSerializer(_material_all, many=True)

                    return Response({"class_material": send_data.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def current_material(self, request):
        data = request.data
        print('DATA MATERIAL CREATE:', data)        
        try:                                    
            with transaction.atomic():
                _id = data.get("id")
                print("ID of listCurrentMaterial", _id)

                _material_all = ClassMaterial.objects.filter(assignment=_id, activo=True)

                send_data = ClassMaterialSerializer(_material_all, many=True)

                return Response({"class_material": send_data.data}, status=status.HTTP_200_OK)                            
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def current_homework(self, request):
        data = request.data
        user = request.user
        print('DATA HOMEWORK CREATE:', data)        
        try:                                    
            with transaction.atomic():
                _id = data.get("id")
                print("ID of current_homework", _id)

                _homework_all = Homework.objects.filter(
                    assignment=_id, 
                    activo=True
                )

                send_data = HomeworkSerializer(_homework_all, many=True)

                return Response({"homework": send_data.data}, status=status.HTTP_200_OK)                            
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def create_homework(self, request):
        data = request.data
        print('DATA create_homework CREATE:', data)        
        try:                                    
            with transaction.atomic():
                homework_register = HomeworkRegisterSerializer(data)                
                       
                if homework_register.is_valid:
                    _attached = data.get('attached')
                    _date_delivery = data.get('date_delivery')
                    _description = data.get('description')
                    _myvalue = data.get('myvalue')
                    _title = data.get('title')
                    _assign_id = data.get("assignment")
                    
                    _assignment = Assignment.objects.get(id=_assign_id, activo=True)

                    _homework = Homework.objects.create(
                        attached=_attached,
                        date_delivery=_date_delivery,
                        description=_description,
                        myvalue=_myvalue,
                        title=_title,
                        assignment=_assignment
                    )

                    _homework.save()

                    _homework_all = Homework.objects.filter(assignment=_assign_id, activo=True)
                    send_data = HomeworkSerializer(_homework_all, many=True)
                    
                    return Response({"homework": send_data.data}, status=status.HTTP_200_OK)                  
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)                  
                
                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["post"], detail=False)    
    def update_homework(self, request):
        data = request.data
        print('DATA update_homework CREATE:', data)        
        try:                                    
            with transaction.atomic():
                homework_register = HomeworkRegisterSerializer(data)                
                       
                if homework_register.is_valid:
                    _attached = data.get('attached')
                    _date_delivery = data.get('date_delivery')
                    _description = data.get('description')
                    _myvalue = data.get('myvalue')
                    _title = data.get('title')
                    _assign_id = data.get("assignment")
                    _id = data.get("id")
                    
                    _assignment = Assignment.objects.get(id=_assign_id, activo=True)

                    _homework = Homework.objects.get(id=_id, assignment=_assign_id, activo=True)
                    _homework.title = _title
                    _homework.myvalue = _myvalue
                    _homework.description = _description
                    _homework.date_delivery = _date_delivery
                    _homework.attached = _attached                    

                    _homework.save()

                    _homework_all = Homework.objects.filter(assignment=_assign_id, activo=True)
                    send_data = HomeworkSerializer(_homework_all, many=True)
                    
                    return Response({"homework": send_data.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def delete_homework(self, request):
        data = request.data
        try:                                    
            with transaction.atomic():
                _assign_id = data.get("assignment")
                _id = data.get("id")
                print("ID of delete_homework, homework, assign", _id, _assign_id)

                if _assign_id is not None and _id is not None:
                    _homework = Homework.objects.get(id=_id, assignment=_assign_id, activo=True)
                    _homework.delete()

                    _homework_all = Homework.objects.filter(assignment=_assign_id, activo=True)
                    send_data = HomeworkSerializer(_homework_all, many=True)
                    
                    return Response({"homework": send_data.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)    
    def detail_homework(self, request):
        data = request.data
        user = request.user
        print('DATA detail_homework CREATE:', data)        
        try:                                    
            with transaction.atomic():
                _assign_id = data.get("assignment")
                _id = data.get("id")
                       
                if _id is not None and _assign_id is not None:                    
                    _homework = Homework.objects.get(id=_id, assignment=_assign_id, activo=True)                    
                    send_data = HomeworkSerializer(_homework)

                    _profile = Profile.objects.get(user=user.id, activo=True)
                    _student = Student.objects.get(profile=_profile.id, activo=True)

                    count_deliver = len(HomeworkStudent.objects.filter(homework=_id, student=_student.id, activo=True))
                    res_homework = None
                    if(count_deliver > 0):
                        res_homework = HomeworkStudent.objects.get(homework=_id, student=_student.id, activo=True)
                        send_res_homework = HomeworkStudentSerializer(res_homework)
                        res_homework = send_res_homework.data
                                        
                    return Response({"homework": send_data.data, "count": count_deliver, "res_homework":res_homework}, status=status.HTTP_200_OK)                    
                else:
                    return Response({"detail": "You didnt send all the necessary data"}, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({"detail": "Somenthing was wrong, its no possible to create professor"}, status=status.HTTP_400_BAD_REQUEST)              
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    
    