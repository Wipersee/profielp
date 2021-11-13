from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("me", views.GetUser.as_view()),
    path(
        "logout",
        views.LogoutAndBlacklistRefreshTokenForUserView.as_view(),
        name="logout",
    ),
    path("password", views.ChangePassword.as_view()),
    path("registration/customer", views.CustomerRegistration.as_view()),
    path("registration/performer", views.PerformerRegistration.as_view()),
    path("performerSpecializations", views.PerformerSpecializationsView.as_view()),
]
