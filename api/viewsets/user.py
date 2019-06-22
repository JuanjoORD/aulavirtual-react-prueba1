from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

from api.serializers import UserSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_staff=True, is_active=True)
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")
