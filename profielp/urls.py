"""profielp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.views.generic import TemplateView
from django.conf.urls import url

schema_view = get_schema_view(  # new
    openapi.Info(
        title="Profielp API",
        default_version="v1",
        description="<p>API for app Profielp.</p>  <h4>In order to Authorize type: <b>Bearer YOUR_ACCESS_TOKEN</b></h4>",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(url="https://github.com/Wipersee/profielp"),
    ),
    # patterns=[
    #     path("api/users", include("users.urls")),
    #     path("api/orders", include("orders.urls")),
    # ],
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("frontend.urls")),
    path("api/users/", include("users.urls")),
    path("api/orders/", include("orders.urls")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(  # new
        "swagger-ui/",
        TemplateView.as_view(
            template_name="swaggerui/swaggerui.html",
            extra_context={"schema_url": "openapi-schema"},
        ),
        name="swagger-ui",
    ),
    url(  # new
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
