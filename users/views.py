from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .services.bl import get_user
from . import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from .services.bl import get_serializer_table
from rest_framework import generics
from .models import Customer, Performer

# Create your views here.


class GetUser(APIView):
    """Endpoint for getting info about logged user"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(get_user(request.user))

    def patch(self, request):
        serializer = get_serializer_table(request.user)[2](
            request.user, data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = serializers.ChangePasswordSerializer(
            request.user,
            request.data,
            context={"request": request},
        )
        if serializer.is_valid():
            serializer.save()
            return Response("Success")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerRegistration(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerRegistrationSerializer
    permission_classes = (AllowAny,)
    authentication_classes = ()
