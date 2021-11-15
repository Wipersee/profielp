from django.db import models
import uuid


class OrderStatus(models.Model):
    order_statuses = [
        ("CRTD", "Created"),
        ("ACCPTD", "Accepted"),
        ("INPRGRS", "In progress"),
        ("ADMN", "Complaint under consideration by the administrator"),
        ("DONE", "Order is finished successfully")
    ]

    # Fields
    order_status_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
    )
    order_status = models.CharField(
        max_length=16, choices=order_statuses, unique=True, help_text="Order status"
    )

    class Meta:
        verbose_name_plural = "Order statuses"
        verbose_name = "Order status"

    def __str__(self):
        return f"Order Status {self.order_status}"


class Complaint(models.Model):
    # Fields
    complaint_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
    )

    admin_id = models.ForeignKey(
        "users.Admin",
        on_delete=models.DO_NOTHING,
        help_text="ID of the Admin that assigned to the complaint",
    )
    requester_id = models.ForeignKey(
        "users.User", on_delete=models.DO_NOTHING, related_name="+"
    )

    comment = models.TextField(
        help_text="Requester complaint text", blank=True, null=True
    )
    admin_comment = models.TextField(help_text="Admin comment", blank=True, null=True)

    date = models.DateTimeField(
        help_text="Date and time of the complaint creating", auto_now_add=True
    )
    resolve_date = models.DateTimeField(
        help_text="Date and time of the complaint resolving", null=True, blank=True
    )
    resolved = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Complaints"
        verbose_name = "Complaint"

    def __str__(self):
        return f"Complaint {self.complaint_id}"


class Order(models.Model):
    # Fields
    order_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
    )

    customer_id = models.ForeignKey(
        "users.Customer", on_delete=models.DO_NOTHING, related_name="+"
    )
    performer_id = models.ForeignKey(
        "users.Performer", on_delete=models.DO_NOTHING, related_name="+"
    )

    order_status_id = models.ForeignKey(
        "OrderStatus", on_delete=models.DO_NOTHING, related_name="+"
    )

    complaint_id = models.OneToOneField(
        "Complaint",
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name="+",
    )

    address = models.TextField(help_text="Order address", blank=True, null=True)
    latitude = models.FloatField(help_text="Order address latitude")
    longitude = models.FloatField(help_text="Order address longitude")

    comment = models.TextField(
        help_text="Order additional comment", blank=True, null=True
    )

    is_high_priority = models.BooleanField(
        help_text="True if order is urgent", default=False
    )

    date = models.DateTimeField(
        help_text="Date and time of the order creation", auto_now=True
    )
    completion_date = models.DateTimeField(
        null=True, blank=True, help_text="Date and time of the order completion"
    )

    customer_approved = models.BooleanField(
        help_text="True if customer approved the work", default=False
    )
    performer_approved = models.BooleanField(
        help_text="True if performer approved the work", default=False
    )

    def __str__(self):
        return f"Order {self.order_id}"
