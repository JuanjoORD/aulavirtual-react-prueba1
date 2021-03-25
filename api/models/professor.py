from django.db import models
from .profile import Profile
from .profession import Profession


class Professor(models.Model):

    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    profession = models.ForeignKey(Profession, on_delete=models.CASCADE, related_name="professor_profession")    

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
