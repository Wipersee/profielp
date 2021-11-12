# Here would be business logic
from users.models import *
from users.serializers import (
    CustomerSerializer,
    PerformerSerializer,
    CustomerUpdateSerializer,
    PerformerUpdateSerializer,
)

user_tables = {
    "CUST": (Customer, CustomerSerializer, CustomerUpdateSerializer),
    "PERF": (Performer, PerformerSerializer, PerformerUpdateSerializer),
}


def get_serializer_table(user: dict) -> tuple:
    """Function for getting serializer, model and update serializer
    depending on user in request object and user_table dict
    """
    return user_tables.get(user.role_id.role)


def get_user(user: dict) -> dict:
    entity = get_serializer_table(user)
    return entity[1](entity[0].objects.get(id=user.id)).data
