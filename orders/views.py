from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .services.bl import get_order_status, filter_order_status, get_free_admin
from . import serializers

from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import OrderStatus, Order, Complaint
from profielp.common import OrderStatusesDict, RolesDict
from rest_framework import generics


class OrderStatusesList(generics.ListAPIView):
    queryset = OrderStatus.objects.all()
    serializer_class = serializers.OrderStatusSerializer
    permission_classes = [IsAuthenticated]


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

    def post(self, request):
        """Create order"""
        crt_id = OrderStatus.objects.get(order_status="CRTD")
        orders = Order.objects.filter(
            customer_id=request.data["customer_id"],
            performer_id=request.data["performer_id"],
            order_status_id=crt_id,
        )
        if len(orders) > 0:  # Checks for orders in db
            return Response(
                ["Order is already created"], status=status.HTTP_400_BAD_REQUEST
            )
        request.data.update(
            order_status_id=crt_id.order_status_id
        )  # because order_status_id is not in request.data, but serializer need it
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


class IncomingOrders(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        incoming_orders = Order.objects.filter(
            performer_id=request.user.id,
            order_status_id=filter_order_status(OrderStatusesDict.get("created")),
        )
        return Response(serializers.OrderSerializer(incoming_orders, many=True).data)


class OrderCurrent(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user.role_id.role == RolesDict.get("performer"):
            current_orders = Order.objects.filter(
                performer_id=request.user.id,
                order_status_id=filter_order_status(OrderStatusesDict.get("accepted")),
            )
        elif request.user.role_id.role == RolesDict.get("customer"):
            current_orders = Order.objects.filter(
                customer_id=request.user.id,
                order_status_id=filter_order_status(OrderStatusesDict.get("accepted")),
            )
        return Response(
            serializers.OrderCustomerSerializer(current_orders, many=True).data
        )


class ComplaintView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Create complaint"""
        order_id = request.data.pop("order_id", None)
        if order_id is None:
            return Response(
                ["order_id is required"], status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.get(order_id=order_id)
        if order is None:
            return Response(
                [f"No order with such uuid {order_id}"],
                status=status.HTTP_404_NOT_FOUND,
            )

        request.data["admin_id"] = get_free_admin()

        if order.complaint_id is not None:
            return Response(
                [
                    f"Complaint for the order {order_id} already exists. Complaint id: {order.complaint_id}"
                ],
                status=status.HTTP_400_BAD_REQUEST,
            )

        complaint_serializer = serializers.ComplaintSerializer(data=request.data)

        if complaint_serializer.is_valid():
            try:
                complaint_serializer.save()
                order.complaint_id = Complaint.objects.get(
                    complaint_id=complaint_serializer.data.get("complaint_id")
                )

                order.save()

                return Response(complaint_serializer.data)
            except Exception as e:
                error = str(e)
        else:
            error = "invalid"
        return Response([error], status=status.HTTP_400_BAD_REQUEST)
