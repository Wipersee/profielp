from users.models import Customer, Performer
from rest_framework import serializers


def get_customer(user_id):
    return Customer.objects.get(id=user_id)


def get_performer(user_id):
    return Performer.objects.get(id=user_id)


def is_required(value):
    if value is None:
        raise serializers.ValidationError("This field is required")
