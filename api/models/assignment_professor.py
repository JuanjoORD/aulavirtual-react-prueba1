from django.db import models
from .assignment import Assignment
from .professor import Professor


class AssignmentProfessor(models.Model):    

    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name="assignprofessor_assignment")
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name="assignprofessor_professor")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.professor.profile.name

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
