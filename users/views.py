from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .services.bl import get_user
from . import serializers
# Create your views here.

class GetUser(APIView):
    """Endpoint for getting info about logged user"""
    def get(self, request):
        #some union of logic
        return Response(get_user(request.user.id))