from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
from rest_framework_simplejwt import token_blacklist


# admin.site.register(token_blacklist.models.BlacklistedToken)


class CustomerAdmin(UserAdmin):
    fieldsets = (
        (
            "User info",
            {
                "fields": (
                    "username",
                    "first_name",
                    "last_name",
                    "email",
                    "last_login",
                    "date_joined",
                    "phone_number",
                    "latitude",
                    "longitude",
                    "is_blocked",
                ),
            },
        ),
        (
            "User role",
            {
                "fields": ("role_id",),
            },
        ),
    )
    readonly_fields = ("last_login", "date_joined")


class AdminAdmin(UserAdmin):
    fieldsets = (
        (
            "User info",
            {
                "fields": (
                    "username",
                    "first_name",
                    "last_name",
                    "email",
                    "last_login",
                    "date_joined",
                    "phone_number",
                ),
            },
        ),
        (
            "User role",
            {
                "fields": ("role_id",),
            },
        ),
    )
    readonly_fields = ("last_login", "date_joined")


class PerformerAdmin(UserAdmin):
    fieldsets = (
        (
            "User info",
            {
                "fields": (
                    "username",
                    "first_name",
                    "last_name",
                    "email",
                    "last_login",
                    "date_joined",
                    "phone_number",
                ),
            },
        ),
        (
            "User role",
            {
                "fields": ("role_id",),
            },
        ),
        (
            "Profielp Info",
            {
                "fields": (
                    "performer_specialization_id",
                    "status_is",
                    "work_day_start",
                    "work_day_end",
                    "latitude",
                    "longitude",
                    "description",
                    "avg_price_per_hour",
                    "is_blocked",
                ),
            },
        ),
    )
    readonly_fields = ("last_login", "date_joined")


admin.site.register(Role)
admin.site.register(PerformerSpecialization)
admin.site.register(PerformerStatus)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Admin, AdminAdmin)
admin.site.register(Performer, PerformerAdmin)
admin.site.register(User)
