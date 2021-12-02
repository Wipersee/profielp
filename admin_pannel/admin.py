from django.contrib.admin import AdminSite, ModelAdmin
from users.models import Customer, Performer
from orders.models import Complaint, Order
from django.contrib import admin

# Register your models here.
class DataAdminSite(AdminSite):
    site_header = "Admin pannel"
    site_title = "Admin Pannel"
    index_title = "Welcome to admin pannel"


admin_pannel = DataAdminSite(name="data_admin")


@admin.register(Customer, site=admin_pannel)
class CustomerAdmin(admin.ModelAdmin):
    search_fields = ["username", "first_name"]
    exclude = [
        "password",
        "last_login",
        "is_superuser",
        "groups",
        "user_permissions",
        "is_staff",
        "avatar",
        "address",
        "latitude",
        "longitude",
    ]
    readonly_fields = [
        "username",
        "first_name",
        "last_name",
        "date_joined",
        "email",
        "role_id",
        "phone_number",
    ]

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Performer, site=admin_pannel)
class PerformerAdmin(admin.ModelAdmin):
    search_fields = ["username", "first_name"]
    exclude = [
        "password",
        "last_login",
        "is_superuser",
        "groups",
        "user_permissions",
        "is_staff",
        "avatar",
        "address",
        "latitude",
        "longitude",
    ]
    readonly_fields = [
        "username",
        "first_name",
        "last_name",
        "date_joined",
        "email",
        "role_id",
        "phone_number",
        "performer_specialization_id",
        "status_is",
        "work_day_start",
        "work_day_end",
        "description",
        "avg_price_per_hour",
    ]

    def has_delete_permission(self, request, obj=None):
        return False


class OrderInline(admin.StackedInline):
    model = Order
    readonly_fields = (
        "order_id",
        "customer_id",
        "performer_id",
        "order_status_id",
        "complaint_id",
        "address",
        "latitude",
        "longitude",
        "comment",
        "is_high_priority",
        "date",
        "completion_date",
        "customer_approved",
        "performer_approved",
    )


@admin.register(Complaint, site=admin_pannel)
class ComplaintAdmin(admin.ModelAdmin):
    list_filter = ["date", "resolve_date", "resolved"]
    list_display = ["requester_id", "comment", "date", "resolve_date", "resolved"]
    search_fields = ["address", "complaint__id"]
    exclude = [
        "complaint_id",
    ]
    readonly_fields = [
        "resolve_date",
        "comment",
        "admin_id",
        "requester_id",
    ]

    def get_queryset(self, request):
        qs = super(admin.ModelAdmin, self).get_queryset(request)
        return qs.filter(admin_id=request.user.id)


@admin.register(Order, site=admin_pannel)
class OrderAdmin(admin.ModelAdmin):
    list_filter = [
        "completion_date",
        "date",
        "is_high_priority",
    ]
    list_display = [
        "customer_id",
        "performer_id",
        "customer_approved",
        "performer_approved",
        "date",
    ]
    search_fields = ["address", "complaint_id__complaint_id"]

    def get_queryset(self, request):
        qs = super(admin.ModelAdmin, self).get_queryset(request)
        return qs.filter(
            complaint_id__isnull=False, complaint_id__admin_id=request.user.id
        )
