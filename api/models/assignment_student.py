from django.db import models
from .assignment import Assignment
from .student import Student


class AssignmentStudent(models.Model):            

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="assignstudent_student")
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name="assignstudent_assignment")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.student.card_id

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
