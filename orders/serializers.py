from rest_framework import serializers
from orders.models import Order, Complaint, OrderStatus
from profielp.common import OrderStatusesDict
from users.serializers import CustomerSerializer

from orders.services.bl import get_order_status


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = (
            "order_status_id",
            "order_status",
        )


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = [
            "complaint_id",
            "admin_id",
            "requester_id",
            "comment",
            "admin_comment",
            "date",
            "resolve_date",
            "resolved",
        ]

    def create(self, validated_data):
        complaint = Complaint(**validated_data)
        complaint.save()
        return complaint


class OrderCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "order_id",
            "customer_id",
            "performer_id",
            "complaint_id",
            "address",
            "latitude",
            "longitude",
            "comment",
            "is_high_priority",
            "date",
            "completion_date",
            "customer_approved",
            "performer_approved",
        ]

    def to_representation(self, instance):
        response = super().to_representation(instance)

        response["user"] = CustomerSerializer(instance.customer_id).data

        return response


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "order_id",
            "customer_id",
            "performer_id",
            "complaint_id",
            "address",
            "latitude",
            "longitude",
            "comment",
            "is_high_priority",
            "date",
            "completion_date",
            "customer_approved",
            "performer_approved",
            "order_status_id",
        ]

    def create(self, validated_data):
        order = Order(
            **validated_data,
        )
        order.save()
        return order

    def update(self, instance, validated_data):
        instance.completion_date = validated_data.get(
            "completion_date", instance.completion_date
        )
        instance.customer_approved = validated_data.get(
            "customer_approved", instance.customer_approved
        )
        instance.performer_approved = validated_data.get(
            "performer_approved", instance.performer_approved
        )

        if instance.customer_approved and instance.performer_approved:
            instance.order_status_id, error_message = get_order_status(status="DONE")
        else:
            # if order status was changed, change order status id
            old_order_status_id = instance.order_status_id
            new_order_status_id = validated_data.get("order_status_id", None)

            if new_order_status_id and old_order_status_id != new_order_status_id:
                instance.order_status_id = new_order_status_id
                if new_order_status_id.order_status == OrderStatusesDict.get(
                    "accepted"
                ):  # Handling logic of coordinates updating
                    performer = instance.performer_id
                    performer.longitude = instance.longitude
                    performer.latitude = instance.latitude
                    performer.save()

        instance.save()
        return instance

    def to_representation(self, instance):
        response = super().to_representation(instance)

        # I have no idea why it works (.order_status_id.order_status) but it works and I don't care
        order_status_id = Order.objects.get(
            order_id=instance.order_id
        ).order_status_id.order_status
        order_status = Order.objects.get(
            order_id=instance.order_id
        ).order_status_id.order_status
        response["order_status_id"] = order_status_id
        response["order_status"] = order_status

        response["complaint"] = ComplaintSerializer(instance.complaint_id).data

        return response


class SegmentSerializer(serializers.ModelSerializer):
    class Meta:
        many = True
        model = Order


# def update(self, instance, validated_data):
#     """
#     Update and return an existing `Snippet` instance, given the validated data.
#     """
#     instance.title = validated_data.get('title', instance.title)
#     instance.code = validated_data.get('code', instance.code)
#     instance.linenos = validated_data.get('linenos', instance.linenos)
#     instance.language = validated_data.get('language', instance.language)
#     instance.style = validated_data.get('style', instance.style)
#     instance.save()
#     return instance
