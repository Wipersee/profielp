from django.urls import path
from . import views


urlpatterns = [
    path("", views.index),
    path("agreement", views.index),
    path("cabinet/my-data", views.index),
    path("cabinet/my-orders", views.index),
    path("cabinet/active-deal", views.index),
    path("cabinet/settings", views.index),
    path("cabinet/history-orders", views.index),
    path("cabinet/list-of-deals", views.index),
    path("login", views.index),
    path("registration", views.index),
]
