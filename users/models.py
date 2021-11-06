from django.db import models


class Role(models.Model):
    roles = [
        ('ADMN', 'admin'),
        ('CUST', 'customer'),
        ('PERF', 'performer')
    ]

    # Fields
    role_id = models.UUIDField(primary_key=True, editable=False)
    role = models.CharField(max_length=16, choices=roles, help_text="User role")

    # Methods
    def __str__(self):
        """
        String for representing the Role object (in Admin site etc.)
        """
        return f"Roles {self.roles}"


class PerformerSpecialization(models.Model):
    # TODO add more specializations
    performer_specializations = [('PL', 'plumber'), ('EL', 'electrician')]

    # Fields
    performer_specialization_id = models.UUIDField(primary_key=True, editable=False)
    performer_specialization = models.CharField(max_length=16, choices=performer_specializations,
                                                help_text="Performer specializations")

    # Methods
    def __str__(self):
        """
        String for representing the Role object (in Admin site etc.)
        """
        return f"Performer specializations {self.performer_specializations}"


class PerformerStatus(models.Model):
    # TODO make statuses more informative
    performer_statuses = [
        ('NO', 'no orders today'),
        ('OVER', 'the working day is over'),
        ('MAKING', 'making order'),
        ('FINISHED', 'finished order')
    ]

    # Fields
    performer_status_id = models.UUIDField(primary_key=True, editable=False)
    performer_status = models.CharField(max_length=16, choices=performer_statuses,
                                        help_text="Performer specializations")

    # Methods
    def __str__(self):
        """
        String for representing the Role object (in Admin site etc.)
        """
        return f"Performer status {self.performer_statuses}"


class User(models.Model):
    # Fields
    user_uuid = models.UUIDField(primary_key=True, editable=False)

    role_id = models.ForeignKey("Role", on_delete=models.DO_NOTHING)  # many to one relationship with the Role table

    first_name = models.CharField(max_length=63, help_text="First name")
    last_name = models.CharField(max_length=63, help_text="Last name")
    username = models.CharField(max_length=31, help_text="Username")
    avatar = models.ImageField(help_text="Image for the avatar")
    # avatar = models.URLField(help_text="Link for the storage with the image for the avatar (s3 path ?)")

    phone_number = models.CharField(max_length=31, help_text="User phone number}")  # TODO add regex (optional)
    email = models.EmailField(help_text="Enter email")
    password = models.CharField(max_length=255, help_text="User password (hashed)")  # TODO and hashing JWT etc

    registration_date = models.DateTimeField(help_text="Date and time of the registration", editable=False)

    # Methods
    def get_something_for_example(self):
        """
        Documentation
        """
        return f"Example name: {self.username}"

    def __str__(self):
        return "User"


class Customer(User):
    # Fields
    uuid = models.ForeignKey("User", primary_key=True, editable=False, on_delete=models.CASCADE, related_name='+')

    address = models.TextField(help_text="Customer's address")
    latitude = models.FloatField(help_text="Customer's address latitude")
    longitude = models.FloatField(help_text="Customer's address longitude")

    is_blocked = models.BooleanField(help_text="True if user is blocked by Admin", default=False)

    def __str__(self):
        return "Customer"


class Admin(User):
    # Fields
    uuid = models.ForeignKey("User", primary_key=True, editable=False, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return "Admin"


class Performer(User):
    # Fields
    uuid = models.ForeignKey("User", primary_key=True, editable=False, on_delete=models.CASCADE, related_name='+')

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

    avg_price_per_hour = models.FloatField(help_text="Few words of the Performer about himself/herself")

    is_blocked = models.BooleanField(help_text="True if user is blocked by Admin", default=False)

    def __str__(self):
        return "Performer"
