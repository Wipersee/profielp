from django.urls import path
from . import views

urlpatterns = [
    path("", views.OrderDetailsView.as_view()),
    path("<uuid:order_id>", views.OrderDetailsView.as_view()),
    path("status/<str:order_status_value>", views.OrderStatusView.as_view()),
    path("incoming", views.IncomingOrders.as_view()),
    path("statuses", views.OrderStatusesList.as_view()),
    path("current", views.OrderCurrent.as_view()),
    path("complaint", views.ComplaintView.as_view()),
]
