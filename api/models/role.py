from django.db import models
from django.utils import timezone


class Role(models.Model):    

    name = models.CharField(max_length=100, null=True, blank=True)     

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(default=timezone.now)
    modificado = models.DateTimeField(default=timezone.now)

    def __unicode__(self):
        return self.name

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
