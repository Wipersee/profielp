from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from orders.services.bl import get_all_orders_by_user_id
from .services.bl import get_user
from . import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from .services.bl import get_serializer_table
from rest_framework import generics
from .models import Customer, Performer, PerformerSpecialization
from .services.filters import ProductFilter
from django_filters import rest_framework as filters

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


class UpdateUserAvatar(generics.UpdateAPIView):

    serializer_class = serializers.ChangeUserAvatarSerializer

    def get_object(self):
        user = self.request.user
        return user


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


class PerformerRegistration(generics.CreateAPIView):
    queryset = Performer.objects.all()
    serializer_class = serializers.PerformerRegistrationSerializer
    permission_classes = (AllowAny,)
    authentication_classes = ()


class PerformerSpecializationsView(generics.ListAPIView):
    queryset = PerformerSpecialization.objects.all()
    serializer_class = serializers.PerformerSpecializationSerializer
    permission_classes = [AllowAny]
    authentication_classes = ()


# TODO: REWRITE TO ISAUTH!!!!
class PerformersView(generics.ListAPIView):
    serializer_class = serializers.PerformerShortSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Performer.objects.filter(
            latitude__isnull=False, longitude__isnull=False
        )
        return queryset


class PerformerDetaildView(generics.RetrieveAPIView):
    serializer_class = serializers.PerformerSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = "pk"

    def get_queryset(self):
        pk = self.kwargs.get(self.lookup_url_kwarg)
        performer = Performer.objects.filter(id=pk)
        return performer


class UsersOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        """Get orders by user id (TODO add filters and checking try-except/if)"""
        return Response(get_all_orders_by_user_id(user_id=user_id))
