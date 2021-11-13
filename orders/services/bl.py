from orders.models import OrderStatus
from users.models import Role


def get_order_status(status: str) -> (OrderStatus, str):
    status = status.upper()
    try:
        order_status = OrderStatus.objects.get(order_status=status)
        error_message = None
    # Order Status with this status doesn't exist or some other exception, I don't want to handle them
    except Exception as e:
        order_status = OrderStatus()
        error_message = e

    return order_status, error_message


def get_user_role_by_id(role_id):
    try:
        role = Role.objects.get(role_id=role_id).role
        error_message = None
    # Role with this role id doesn't exist or some other exception, I don't want to handle them
    except Exception as e:
        role = None
        error_message = e
    return role, error_message


# TODO add status checking
def get_all_orders_by_user_id(user_id: str, user_role_id: str) -> (OrderStatus, str):
    user_role = get_user_role_by_id(user_role_id)
    try:
        error_message = None

        if user_role == "CUST":
            orders = OrderStatus.objects.filter(customer_id=user_id)
        elif user_role == "PERF":
            orders = OrderStatus.objects.filter(performer_id=user_id)
        else:
            orders = []
            error_message = f"Don't know what to do with the user role {user_role}"
    # Order Status with this status doesn't exist or some other exception, I don't want to handle them
    except Exception as e:
        orders = []
        error_message = e

    return orders, error_message
