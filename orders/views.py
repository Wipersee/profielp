from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .services.bl import get_order_status, filter_order_status, get_free_admin
from . import serializers

from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import OrderStatus, Order, Complaint
from profielp.common import OrderStatusesDict, RolesDict
from rest_framework import generics
from django.db.models import Q
from profielp.logging import set_logger

logger = set_logger(__name__)

class OrderStatusesList(generics.ListAPIView):
    logger.info(f"Order statuses requested")
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
            logger.info(f"Order status {order_status_value} not found {error_message}")
            return Response(
                {"Error:": str(error_message)}, status=status.HTTP_404_NOT_FOUND
            )
        logger.info(f"Order status {order_status_value} found")
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
            logger.info(f"Order is already created")
            return Response(
                ["Order is already created"], status=status.HTTP_400_BAD_REQUEST
            )
        request.data.update(
            order_status_id=crt_id.order_status_id
        )  # because order_status_id is not in request.data, but serializer need it
        created_order_serializer = serializers.OrderSerializer(data=request.data)

        if created_order_serializer.is_valid():
            created_order_serializer.save()
            logger.info(f"Order created")
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
            logger.info(f"Order {order} updated")
            return Response(updated_order_serializer.data)
        logger.info(f"Order {order} not updated {updated_order_serializer.errors}")
        return Response(
            updated_order_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    # Placeholder for the future use to move order to the Archive table
    def delete(self, request):
        """Delete order"""
        return Response(status=status.HTTP_404_NOT_FOUND)


class IncomingOrders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        incoming_orders = Order.objects.filter(
            performer_id=request.user.id,
            order_status_id=filter_order_status(OrderStatusesDict.get("created")),
        )
        logger.info(f"Incoming orders for {request.user} requested")
        return Response(serializers.OrderSerializer(incoming_orders, many=True).data)


class OrderCurrent(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if request.user.role_id.role == RolesDict.get("performer"):

                current_orders = Order.objects.filter(
                    performer_id=request.user.id,
                    order_status_id=filter_order_status(
                        OrderStatusesDict.get("accepted")
                    ),
                )
            elif request.user.role_id.role == RolesDict.get("customer"):

                current_orders = Order.objects.filter(
                    customer_id=request.user.id,
                    order_status_id=filter_order_status(
                        OrderStatusesDict.get("accepted")
                    ),
                )
            logger.info(f"Current order for {request.user} requested")
            return Response(
                serializers.OrderCustomerSerializer(current_orders, many=True).data
            )
        except Exception as e:
            logger.error(f"Current order for {request.user} error {e}")
            return Response([str(e)], status=status.HTTP_400_BAD_REQUEST)


class OrderList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if request.user.role_id.role == RolesDict.get("performer"):
                current_orders = (
                    Order.objects.filter(
                        performer_id=request.user.id,
                        order_status_id=filter_order_status(
                            OrderStatusesDict.get("done")
                        ),
                    )
                    | Order.objects.filter(
                        performer_id=request.user.id,
                        order_status_id=filter_order_status(
                            OrderStatusesDict.get("declined")
                        ),
                    ).order_by("-date")
                )

            elif request.user.role_id.role == RolesDict.get("customer"):
                current_orders = Order.objects.filter(
                    Q(
                        order_status_id=filter_order_status(
                            OrderStatusesDict.get("done")
                        ),
                    )
                    | Q(
                        order_status_id=filter_order_status(
                            OrderStatusesDict.get("declined")
                        )
                    ),
                    customer_id=request.user.id,
                ).order_by("-date")
            logger.info(f"Order list for {request.user} requested")
            return Response(
                serializers.OrderCustomerSerializer(current_orders, many=True).data
            )
        except Exception as e:
            logger.error(f"Order list for {request.user} error {e}")
            return Response([str(e)], status=status.HTTP_400_BAD_REQUEST)


class ComplaintView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Create complaint"""
        order_id = request.data.pop("order_id", None)
        if order_id is None:
            logger.error(f"Order id is required")
            return Response(
                ["order_id is required"], status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.get(order_id=order_id)
        if order is None:
            logger.error(f"Order {order_id} is none")
            return Response(
                [f"No order with such uuid {order_id}"],
                status=status.HTTP_404_NOT_FOUND,
            )

        request.data["admin_id"] = get_free_admin()

        if order.complaint_id is not None:
            logger.error(f"Complaint for {order_id} is already exists")
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
                logger.info(f"Complaint success")
                return Response(complaint_serializer.data)
            except Exception as e:
                error = str(e)
        else:
            error = "invalid"
        logger.error(f"{error}")
        return Response([error], status=status.HTTP_400_BAD_REQUEST)
