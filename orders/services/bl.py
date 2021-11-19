from django.db.models import Count

from orders.models import OrderStatus, Order, Complaint
from users.models import User, Role, Admin


def filter_order_status(status):
    return OrderStatus.objects.get(order_status=status)


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


def get_user_role_by_user_id(user_id):
    try:
        # TODO use select_related
        user_role_id = User.objects.get(user_id=id).role_ir
        role = Role.objects.get(role_id=user_role_id).role
        error_message = None
    # Role or user with the id doesn't exist or some other exception, I don't want to handle them
    except Exception as e:
        role = None
        error_message = e
    return role, error_message


# TODO add status checking
def get_all_orders_by_user_id(user_id: str) -> (Order, str):
    user_role = get_user_role_by_user_id(user_id)
    try:
        error_message = None

        if user_role == "CUST":
            orders = Order.objects.filter(
                customer_id=user_id,
                order_status_id=OrderStatus.objects.get(order_status="DONE"),
            )
        elif user_role == "PERF":
            orders = Order.objects.filter(
                performer_id=user_id,
                order_status_id=OrderStatus.objects.get(order_status="DONE"),
            )
        else:
            orders = []
            error_message = f"Don't know what to do with the user role {user_role}"
    # Order Status with this status doesn't exist or some other exception, I don't want to handle them
    except Exception as e:
        orders = []
        error_message = e

    return orders, error_message


def get_free_admin():
    admin = (
        Complaint.objects.filter(resolved=False)
        .values("admin_id")
        .annotate(dcount=Count("complaint_id"))
        .order_by("dcount")
        .first()
    )
    admin_id = None
    if admin is not None:
        admin_id = admin.get("admin_id", None)

    if admin_id is None:
        admin_id = Admin.objects.first().id

    return admin_id
