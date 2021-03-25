from django.db import models
from .homework import Homework
from .student import Student


class HomeworkStudent(models.Model):    

    date = models.DateTimeField(auto_now=True)
    myfile = models.FileField(upload_to='HomeworkStudent', null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    points = models.TextField(null=True, blank=True)

    homework = models.ForeignKey(Homework, on_delete=models.CASCADE, related_name="homeworkstudent_homework")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="homeworkstudent_student")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.date

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
