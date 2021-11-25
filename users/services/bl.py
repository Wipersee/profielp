# Here would be business logic
from users.models import *
from users.serializers import (
    CustomerSerializer,
    PerformerSerializer,
    CustomerUpdateSerializer,
    PerformerUpdateSerializer,
    CustomerUpdateAvatar,
)
from logger.logger import set_logger

logger = set_logger(name=__name__)

user_tables = {
    "CUST": (
        Customer,
        CustomerSerializer,
        CustomerUpdateSerializer,
        CustomerUpdateAvatar,
    ),
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


def get_performer_by_user_request(user_id):
    return Performer.objects.get(id=user_id)
