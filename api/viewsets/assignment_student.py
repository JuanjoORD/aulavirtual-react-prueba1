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

from api.models import Assignment, Student, AssignmentStudent, AssignmentProfessor, Professor, Profile
from api.serializers import (AssignmentStudentSerializer, AssignmentStudentRegisterSerializer, 
                                AssignmentProfessorSerializer, AssignmentSerializer, StudentSerializer                                
                            )


class AssignmentStudentViewset(viewsets.ModelViewSet):
    queryset = AssignmentStudent.objects.filter(activo=True)

    '''
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("name",)
    ordering_fields = ("name",)
    '''

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AssignmentStudentSerializer
        else:
            return AssignmentStudentRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """        
        
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    
    def create(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                print("DATA ASIGNATURAS student:", data)
                _student = data.get("student")
                _assignment = data.get("assignment")

                if _student is not None and _assignment is not None:  
                    print("DATA profesor:", _student)
                    print("DATA assignment:", _assignment)                    
                    
                    return Response({"assignment_student": "All assignments to student created succesfully"}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data or empty array"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to create assignment to student"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                print("DATA ASIGNATURAS profesor:", data)
                _student = data.get("student")
                _assignment = data.get("assignment")
                _id = data.get("id")

                if _student is not None and _assignment is not None and _id is not None:
                    print("DATA profesor:", _student)
                    print("DATA assignment:", _assignment)
                    print("DATA ID:", _id)
                    
                    return Response({"assignment_student": "All assignments to student updated succesfully"}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data or empty array"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to update assignment to student"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def myAssignmentsProf(self, request, *args, **kwargs):        
        #user = request.user        
        try:
            with transaction.atomic():  
                '''                              
                _profile = Profile.objects.get(user=user.id, activo=True)                
                
                try:
                    _professor = Professor.objects.get(profile=_profile, activo=True)
                except Professor.DoesNotExist:
                    _professor = None
                    '''
                _professor = request.user.profile.professor
                my_assignments = []

                if _professor is not None:
                    _assignment = AssignmentProfessor.objects.filter(professor=_professor, activo=True)
                                    
                    id_list = []

                    for e in _assignment:
                        id_list.append(e.assignment.id)
                    
                    my_assignments = Assignment.objects.filter(id__in=id_list)

                if len(my_assignments) > 0:
                    data = AssignmentSerializer(my_assignments, many=True)
                    send_data = {
                        "count": len(my_assignments),
                        "results": data.data
                    }
                    return Response({"results": send_data}, status=status.HTTP_200_OK)
                else:
                    return Response({"results": []}, status=status.HTTP_200_OK)

                return Response({"detail": "Somenthing was wrong, its not possible to get myAssignmentsProf"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def updateStudentAssign(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                print("DATA ASIGNATURAS profesor:", data)
                _id = data.get("id")
                _students = data.get("students")
                _toDelete = data.get("toDelete")

                if _id is not None and _students is not None and _toDelete is not None:                                        

                    if len(_students) > 0:
                        _assignment = Assignment.objects.get(id=_id, activo=True)
                        
                        assignment_student_list = [
                            AssignmentStudent(
                                student=Student.objects.get(id=element.get("student").get("value")),
                                assignment=_assignment
                            ) for element in _students
                        ]
                        
                        assign_student_created = AssignmentStudent.objects.bulk_create(assignment_student_list)
                    
                    if len(_toDelete) > 0:
                        assing_student_delete = AssignmentStudent.objects.filter(student__in=_toDelete, assignment=_id, activo=True)

                        for e in assing_student_delete:
                            e.delete()
                            e.save()
                    
                    return Response({"results": "All changes of students in assignment were applied correctly"}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data or empty array"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to update assignment to student"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def listStudentCurrentAssing(self, request, *args, **kwargs):
        data = request.data
        try:
            with transaction.atomic():
                print("DATA listStudentCurrentAssing:", data)
                _id = data.get("id")                

                if _id is not None:                                        
                    assign_student = AssignmentStudent.objects.filter(assignment=_id, activo=True)

                    student_id_list = [                        
                        element.student_id for element in assign_student
                    ]

                    _students = Student.objects.filter(id__in=student_id_list, activo=True)
                    student_serializer = StudentSerializer(_students, many=True)
                    
                    
                    return Response({"results": student_serializer.data}, status=status.HTTP_200_OK)                    
                    
                else:
                    return Response({"detail": "You didnt send all the necessary data or empty array"}, status=status.HTTP_400_BAD_REQUEST)                  
                

                return Response({"detail": "Somenthing was wrong, its not possible to update assignment to student"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["post"], detail=False)
    def myAssignmentsStudent(self, request, *args, **kwargs):        
        #user = request.user
        try:
            with transaction.atomic():   
                '''                             
                _profile = Profile.objects.get(user=user.id, activo=True)
                _student = None
                try:
                    _student = Student.objects.get(profile=_profile, activo=True)
                except Professor.DoesNotExist:
                    _student = None
                '''
                _student = request.user.profile.student

                my_assignments = []

                if _student is not None:                    
                    _assignment = AssignmentStudent.objects.filter(student=_student, activo=True)
                                    
                    id_list = []

                    for e in _assignment:
                        id_list.append(e.assignment.id)
                    
                    my_assignments = Assignment.objects.filter(id__in=id_list)

                if len(my_assignments) > 0:
                    data = AssignmentSerializer(my_assignments, many=True)
                    send_data = {
                        "count": len(my_assignments),
                        "results": data.data
                    }
                    return Response({"results": send_data}, status=status.HTTP_200_OK)
                else:
                    return Response({"results": []}, status=status.HTTP_200_OK)

                return Response({"detail": "Somenthing was wrong, its not possible to get myAssignmentsProf"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)