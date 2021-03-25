from django.db import models


class SchoolCycle(models.Model):    

    year = models.CharField(max_length=4, null=True, blank=True)    

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.anio

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
