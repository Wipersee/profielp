#Here would be business logic
from users.models import *

def get_user(id: int) -> dict:
    return {"user":1, "username":"test", "role": 2}