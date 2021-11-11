from django.contrib import admin
from .models import *


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


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_filter = [
        "date",
        "resolve_date",
    ]
    list_display = [
        "requester_id",
        "comment",
        "date",
        "resolve_date",
    ]
    search_fields = ["address", "complaint__id"]
    inlines = [OrderInline]


@admin.register(Order)
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


admin.site.register(OrderStatus)
