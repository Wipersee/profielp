from django_filters import rest_framework as filters
from users.models import Performer
from django.db.models import Q


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="avg_price_per_hour", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="avg_price_per_hour", lookup_expr="lte")
    search = filters.CharFilter(
        method="description_specialization_filter", label="Search"
    )

    class Meta:
        model = Performer
        fields = ("min_price", "max_price", "search")

    def description_specialization_filter(self, queryset, name, value):
        return queryset.filter(
            Q(description__contains=value)
            | Q(performer_specialization_id__performer_specialization__contains=value)
        )
