from django.urls import path
from . import views

urlpatterns = [
    path("", views.OrderDetailsView.as_view()),
    path("<uuid:order_id>", views.OrderDetailsView.as_view()),
    path("status/<str:order_status_value>", views.OrderStatusView.as_view()),
]
