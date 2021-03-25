from django.db import models
from .grade import Grade
from .section import Section
from .course import Course
from .school_cycle import SchoolCycle


class Assignment(models.Model):    

    cover = models.ImageField(null=True, blank=True)    
    description = models.TextField(null=True, blank=True)
    
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name="assignment_grade")
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name="assignment_section")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="assignment_course")
    schoolcycle = models.ForeignKey(SchoolCycle, on_delete=models.CASCADE, related_name="assignment_schoolcycle")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.description

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
