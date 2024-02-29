from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from account.serializers import UserSerializer, AuthTokenSerializer
from rest_framework.parsers import MultiPartParser, FormParser

# from django.shortcuts import render
# Create your views here.


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, FormParser]


class CreateTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self):
        return self.request.user
