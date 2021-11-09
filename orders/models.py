from django.db import models
import uuid


class OrderStatus(models.Model):
    order_statuses = [
        ('CRTD', 'Created'),
        ('ACCPTD', 'Accepted'),
        ('INPRGRS', 'In progress'),
        ('ADMN', 'Complaint under consideration by the administrator')
    ]

    # Fields
    order_status_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_status = models.CharField(max_length=16, choices=order_statuses,
                                    help_text="Order status")

    class Meta:
        verbose_name_plural = "Order statuses"
        verbose_name = "Order status"

    def __str__(self):
        return f"Order Status {self.order_status}"


class Complaint(models.Model):
    # Fields
    complaint_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    admin_id = models.ForeignKey(
        "users.Admin",
        on_delete=models.DO_NOTHING,
        help_text="ID of the Admin that assigned to the complaint"
    )
    customer_id = models.ForeignKey("users.Customer", editable=False, on_delete=models.DO_NOTHING, related_name='+')
    performer_id = models.ForeignKey("users.Performer", editable=False, on_delete=models.DO_NOTHING, related_name='+')

    requester_role_id = models.ForeignKey("users.Role", on_delete=models.DO_NOTHING)

    comment = models.TextField(help_text="Requester complaint text", blank=True, null=True)
    admin_comment = models.TextField(help_text="Admin comment", blank=True, null=True)

    date = models.DateTimeField(help_text="Date and time of the complaint creating", editable=False)
    resolve_date = models.DateTimeField(help_text="Date and time of the complaint resolving", editable=False)

    class Meta:
        verbose_name_plural = "Complaints"
        verbose_name = "Complaint"

    def __str__(self):
        return f"Complaint {self.complaint_id}"


class Order(models.Model):
    # Fields
    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    customer_id = models.ForeignKey("users.Customer", editable=False, on_delete=models.DO_NOTHING, related_name='+')
    performer_id = models.ForeignKey("users.Performer", editable=False, on_delete=models.DO_NOTHING, related_name='+')

    order_status_id = models.ForeignKey("OrderStatus", on_delete=models.DO_NOTHING, related_name='+')
    complaint_id = models.ForeignKey("Complaint", on_delete=models.DO_NOTHING, related_name='+')

    address = models.TextField(help_text="Order address", blank=True, null=True)
    latitude = models.FloatField(help_text="Order address latitude")
    longitude = models.FloatField(help_text="Order address longitude")

    comment = models.TextField(help_text="Order additional comment", blank=True, null=True)

    is_high_priority = models.BooleanField(help_text="True if order is urgent", default=False)

    date = models.DateTimeField(help_text="Date and time of the order creation", editable=False)
    completion_date = models.DateTimeField(help_text="Date and time of the order completion")

    customer_approved = models.BooleanField(help_text="True if customer approved the work", default=False)
    performer_approved = models.BooleanField(help_text="True if performer approved the work", default=False)

    def __str__(self):
        return f"Order {self.order_id}"
