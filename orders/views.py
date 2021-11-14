from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .services.bl import get_order_status
from . import serializers
from orders.models import Order

from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import OrderStatus


class OrderStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_status_value):
        """Get order status id by order status"""
        order_status, error_message = get_order_status(order_status_value)
        order_status_id = order_status.order_status_id
        if error_message:
            return Response(
                {"Error:": str(error_message)}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(order_status_id)


class OrderDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    # def get(self, request):
    #     """Get order by UUID"""
    #     return Response(get_all(request.user.id))

    def post(self, request):
        """Create order"""
        orders = Order.objects.filter(
            customer_id=request.data["customer_id"],
            performer_id=request.data["performer_id"],
            order_status_id=OrderStatus.objects.get(order_status="CRTD"),
        )
        if len(orders) > 0:  # Checks for orders in db
            return Response(
                ["Order is already created"], status=status.HTTP_400_BAD_REQUEST
            )

        created_order_serializer = serializers.OrderSerializer(data=request.data)

        if created_order_serializer.is_valid():
            created_order_serializer.save()
            return Response(created_order_serializer.data)
        return Response(
            created_order_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def patch(self, request, order_id):
        """Update order"""
        order = Order.objects.get(order_id=order_id)
        updated_order_serializer = serializers.OrderSerializer(
            order, data=request.data, partial=True
        )

        if updated_order_serializer.is_valid():
            updated_order_serializer.save()
            return Response(updated_order_serializer.data)
        return Response(
            updated_order_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    # Placeholder for the future use to move order to the Archive table
    def delete(self, request):
        """Delete order"""
        return Response(status=status.HTTP_404_NOT_FOUND)
