from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .services.complaints import get, get_all, update, create, delete
from . import serializers

from rest_framework.permissions import IsAuthenticated


class ComplaintView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get complaint by UUID"""
        return Response(get_all(request.user.id))


class ComplaintDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get complaint by UUID"""
        return Response(get(request.user.id))

    def post(self, request):
        """Post complaint"""
        return Response(create(request.user.id))

    def put(self, request):
        """Update complaint"""
        return Response(update(request.user.id))

    def delete(self, request):
        """Delete complaint"""
        return Response(delete(request.user.id))

# api/orders
# - GET return all with query parameters (django filters in help)
# - POST generation new order
# - PUT / PATH - noting
# - DELETE - noting
#
# api/orders/UUID
# - GET return order
# - POST - noting
# - PUT - update
# - PATCH - partial update
# - DELETE - delete
#
# api/complaints
# api/complaints/UUID
