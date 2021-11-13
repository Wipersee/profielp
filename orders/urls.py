from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("complaint", views.ComplaintView.as_view()),
    path("complaints", views.ComplaintDetailsView.as_view())
]
