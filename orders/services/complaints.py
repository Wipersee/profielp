# Here would be business logic
from orders.models import *


def get(id: int) -> dict:
    return {"user": 1, "username": "test", "role": 2}


def update(id: int) -> dict:
    return {"user": 1, "username": "test", "role": 2}


def create(id: int) -> dict:
    return {"user": 1, "username": "test", "role": 2}


def delete(id: int) -> dict:
    return {"user": 1, "username": "test", "role": 2}


def get_all(id: int) -> dict:
    return {"user": 1, "username": "test", "role": 2}


def get_all_with_filter(id: int) -> dict:
    return {"user": 1, "username": "test", "role": 2}
