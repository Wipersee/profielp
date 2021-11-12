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
]
