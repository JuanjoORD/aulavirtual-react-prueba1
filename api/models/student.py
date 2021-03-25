from django.db import models
from .profile import Profile


class Student(models.Model):    

    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    card_id = models.CharField(max_length=25, blank=True, null=True)
    contact_name = models.CharField(max_length=200, blank=True, null=True)
    contact_address = models.TextField(blank=True, null=True)
    contact_phone = models.CharField(max_length=15, blank=True, null=True)   

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.profile.name

    def delete(self, *args):
        profile = self.profile
        profile.delete()        
        self.activo = False
        self.save()
        return True
