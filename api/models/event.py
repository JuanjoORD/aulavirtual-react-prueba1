from django.db import models
from .school_cycle import SchoolCycle
from .profile import Profile


class Event(models.Model):    

    title = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    schoolcycle = models.ForeignKey(SchoolCycle, on_delete=models.CASCADE, related_name="event_schoolcycle")
    profile = models.ForeignKey(Profile, null=True, blank=True, on_delete=models.CASCADE, related_name="event_profile")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.title

    def delete(self, *args):                
        self.activo = False
        self.save()
        return True
