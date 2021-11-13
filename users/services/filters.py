from django_filters import rest_framework as filters
from users.models import Performer


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="avg_price_per_hour", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="avg_price_per_hour", lookup_expr="lte")

    class Meta:
        model = Performer
        fields = ["description", "min_price", "max_price"]
