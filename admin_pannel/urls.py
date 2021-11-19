from django.urls import path, include
from django.contrib.auth import views as auth_views
from .admin import admin_pannel

urlpatterns = [
    path("", admin_pannel.urls),
]
