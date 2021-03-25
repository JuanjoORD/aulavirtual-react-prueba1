from django.db import models
from .assignment import Assignment


class Homework(models.Model):    

    title = models.CharField(max_length=100, null=True)
    description = models.TextField(default="")
    myvalue = models.TextField()
    attached = models.BooleanField()
    date_delivery = models.DateField()
    time_delivery = models.TimeField(null=True, blank=True)
    

    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name="homework_assignment")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.title

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
