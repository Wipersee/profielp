from users.models import Customer, Performer


def get_customer(user_id):
    return Customer.objects.get(id=user_id)


def get_performer(user_id):
    return Performer.objects.get(id=user_id)
