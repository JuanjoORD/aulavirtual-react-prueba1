from django.db import models


class Level(models.Model):    

    name = models.CharField(max_length=100, null=True, blank=True)      

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.name

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
