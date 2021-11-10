from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


class Role(models.Model):
    roles = [
        ('ADMN', 'admin'),
        ('CUST', 'customer'),
        ('PERF', 'performer')
    ]

    # Fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=16, choices=roles, help_text="User role")

    # Methods
    def __str__(self):
        """
        String for representing the Role object (in Admin site etc.)
        """
        return f"{self.role}"


class PerformerSpecialization(models.Model):
    # TODO add more specializations
    performer_specializations = [('PL', 'plumber'), ('EL', 'electrician')]

    # Fields
    performer_specialization_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    performer_specialization = models.CharField(max_length=16, choices=performer_specializations,
                                                help_text="Performer specializations")

    # Methods
    def __str__(self):
        """
        String for representing the Role object (in Admin site etc.)
        """
        return f"{self.performer_specialization}"


class PerformerStatus(models.Model):
    # TODO make statuses more informative
    performer_statuses = [
        ('NO', 'no orders today'),
        ('OVER', 'the working day is over'),
        ('MAKING', 'making order'),
        ('FINISHED', 'finished order')
    ]

    # Fields
    performer_status_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    performer_status = models.CharField(max_length=16, choices=performer_statuses,
                                        help_text="Performer specializations")

    class Meta:
        verbose_name_plural = "Performer statuses"
        verbose_name = "Performer status"

    # Methods
    def __str__(self):
        """
        String for representing the Role object (in Admin site etc.)
        """
        return f"Performer status {self.performer_status}"


class User(AbstractUser):
    # Fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    role_id = models.ForeignKey("Role", on_delete=models.DO_NOTHING,
                                null=True)  # many to one relationship with the Role table
    phone_number = models.CharField(max_length=31, help_text="User phone number}",
                                    null=True)  # TODO add regex (optional)

    # avatar = models.ImageField(help_text="Image for the avatar")
    # avatar = models.URLField(help_text="Link for the storage with the image for the avatar (s3 path ?)")

    # Methods
    def get_something_for_example(self):
        """
        Documentation
        """
        return f"Example name: {self.username}"

    def __str__(self):
        return f"User {self.username}"


class Customer(User):
    # Fields

    address = models.TextField(help_text="Customer's address", blank=True, null=True)
    latitude = models.FloatField(help_text="Customer's address latitude", blank=True, null=True)
    longitude = models.FloatField(help_text="Customer's address longitude", blank=True, null=True)

    is_blocked = models.BooleanField(help_text="True if user is blocked by Admin", default=False)

    class Meta:
        verbose_name_plural = "Customers"
        verbose_name = "Customer"

    def __str__(self):
        return f"Customer {self.username}"


class Admin(User):
    # Fields

    class Meta:
        verbose_name_plural = "Admins"
        verbose_name = "Admin"

    def __str__(self):
        return f"Admin {self.username}"


class Performer(User):
    # Fields

    performer_specialization_id = models.ForeignKey(
        "PerformerSpecialization",
        on_delete=models.DO_NOTHING,
        help_text="ID of the Performer's  specialization from the PerformerSpecialization table"
    )

    status_is = models.ForeignKey(
        "PerformerStatus",
        on_delete=models.DO_NOTHING,
        help_text="ID of the Performer's current status from the PerformerStatus table"
    )

    work_day_start = models.TimeField(help_text="Performer's work day start")
    work_day_end = models.TimeField(help_text="Performer's work day end")

    latitude = models.FloatField(help_text="Performer's last order latitude")
    longitude = models.FloatField(help_text="Performer's last order longitude")

    description = models.TextField(help_text="Few words of the Performer about himself/herself")

    avg_price_per_hour = models.FloatField(help_text="Average price per hour")

    is_blocked = models.BooleanField(help_text="True if user is blocked by Admin", default=False)

    class Meta:
        verbose_name_plural = "Performers"
        verbose_name = "Performer"

    def __str__(self):
        return f"Performer {self.username}"
