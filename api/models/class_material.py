from django.db import models
from .assignment import Assignment


class ClassMaterial(models.Model):    

    title = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    myfile = models.FileField(upload_to='ClassMaterial')

    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name="classmaterial_assignment")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.title

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
