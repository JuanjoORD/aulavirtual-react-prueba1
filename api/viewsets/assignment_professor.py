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

from api.models import Assignment, Professor, AssignmentProfessor
from api.serializers import AssignmentProfessorSerializer, AssignmentProfessorRegisterSerializer, AssignmentSerializer


class AssignmentProfessorViewset(viewsets.ModelViewSet):
    queryset = AssignmentProfessor.objects.filter(activo=True)

    '''
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("name",)
    ordering_fields = ("name",)
    '''

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AssignmentProfessorSerializer
        else:
            return AssignmentProfessorRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    
    def create(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                print("DATA ASIGNATURAS profesor:", data)
                _professor = data.get("idProfessor")
                _assignment = data.get("toAdd")
                _assignment_del = data.get("toDelete")

                if _professor is not None and _assignment is not None:  
                    print("DATA profesor:", _professor)
                    print("DATA assignment:", _assignment)
                    print("DATA assignment del:", _assignment_del)

                    professor_get = Professor.objects.get(id=_professor)

                    if len(_assignment) > 0:
                        assignment_list = [
                            AssignmentProfessor(
                                professor=professor_get,
                                assignment=Assignment.objects.get(id=e)
                            ) for e in _assignment
                        ]

                        assignment_created = AssignmentProfessor.objects.bulk_create(assignment_list)

                    if len(_assignment_del) > 0:
                        assign_prof_todelete = AssignmentProfessor.objects.filter(id__in=_assignment_del)

                        for e in assign_prof_todelete:
                            e.delete()
                            e.save()                            
                    
                    return Response({"assignment_professor": "All assignments to professor created succesfully"}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary myAssignments"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to create myAssignments"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def myAssignments(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                print("DATA ASIGNATURAS profesor:", data)                
                _id = data.get("id")

                if _id is not None:                    

                    assignments_professor = AssignmentProfessor.objects.filter(professor=_id, activo=True)

                    for e in assignments_professor:
                        print("MODAFOCA MODAFOCA MODAFOCA:", e.__dict__)

                    send_data = AssignmentProfessorSerializer(assignments_professor, many=True)
                    
                    return Response({"myAssignments": send_data.data}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data myAssignments"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to get myAssignments"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def existAssignProf(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                print("DATA exist ASIGNATURAS profesor:", data)                
                _id_assignment = data.get("idAssignment")
                _id_professor = data.get("idProfessor")

                if _id_assignment is not None:                    

                    assignments_professor = AssignmentProfessor.objects.filter(assignment=_id_assignment, activo=True)

                    existAssign = False               

                    if len(assignments_professor) > 0:
                        existAssign = True
                    
                    return Response({"exist": existAssign}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data myAssignments"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to get myAssignments"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def listSelect(self, request, *args, **kwargs):        
        try:
            with transaction.atomic():                

                assignment_professor = AssignmentProfessor.objects.filter(activo=True)
                print("ASSIGNMENT PROFESSOR XD:", assignment_professor.__dict__)

                id_list = []

                for e in assignment_professor:
                    #print("element XD:", e.__dict__)
                    id_list.append(e.assignment_id)
                
                assignments = Assignment.objects.filter(activo=True).exclude(id__in=id_list)
                print("AVERTS QUE PEX JEJE:", assignments)

                if len(assignments) > 0:
                    data = AssignmentSerializer(assignments, many=True)
                    return Response({"results": data.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"results": []}, status=status.HTTP_200_OK)

                return Response({"detail": "Somenthing was wrong, its not possible to get myAssignments"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)        