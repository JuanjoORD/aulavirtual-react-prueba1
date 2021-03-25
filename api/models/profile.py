from django.db import models
from django.contrib.auth.models import User
from .role import Role

class Profile(models.Model):

    MALE = 0
    FEMALE = 1

    GENDERS = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True, related_name="profile_role")

    avatar = models.ImageField(upload_to='Avatar', null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    surname =  models.CharField(max_length=100, null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDERS, null=True, blank=True)
    password_changed = models.BooleanField(default=False)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.user.username

    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.activo = False
        self.save()
        return True
