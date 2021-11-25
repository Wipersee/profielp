from django.db.models import fields
from rest_framework import serializers
from .models import (
    Customer,
    Performer,
    Role,
    PerformerSpecialization,
    PerformerStatus,
    User,
)
from datetime import datetime, timezone
import django.contrib.auth.password_validation as validators
from .services.common import get_performer, get_customer, is_required

from logger.logger import set_logger

logger = set_logger(name=__name__)


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ("role",)


class PerformerSpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformerSpecialization
        fields = (
            "performer_specialization_id",
            "performer_specialization",
        )


class PerformerStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformerStatus
        fields = ("performer_status",)


class CustomerUpdateAvatar(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("avatar",)

    def update(self, instance, validated_data):
        instance.update()
        print(validated_data)
        instance.save()
        return instance


class ChangeUserAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["avatar"]

    def update(self, instance, validated_data):
        instance.avatar.delete(save=False)
        photo_data = validated_data["avatar"]
        instance.avatar.save(f"{instance.username}_photo.jpg", photo_data, save=True)

        return instance


class CustomerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "address",
            "latitude",
            "longitude",
        )

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.email = validated_data.get("email", instance.email)
        instance.phone_number = validated_data.get(
            "phone_number", instance.phone_number
        )
        instance.save()

        customer = Customer.objects.get(id=instance.id)
        customer.address = validated_data.get("address", customer.address)

        customer.latitude = validated_data.get("latitude", customer.latitude)
        customer.longitude = validated_data.get("longitude", customer.longitude)
        customer.save()
        return customer


class PerformerUpdateSerializer(serializers.ModelSerializer):
    # performer_specialization_id = serializers.CharField()

    class Meta:
        model = Performer
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "description",
            "latitude",
            "longitude",
            "avg_price_per_hour",
            "performer_specialization_id",
        )

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.email = validated_data.get("email", instance.email)
        instance.save()

        performer = Performer.objects.get(id=instance.id)
        performer.description = validated_data.get("description", performer.description)
        performer.latitude = validated_data.get("latitude", performer.latitude)
        performer.longitude = validated_data.get("longitude", performer.longitude)
        performer.avg_price_per_hour = validated_data.get(
            "avg_price_per_hour", performer.avg_price_per_hour
        )
        performer.phone_number = validated_data.get(
            "phone_number", performer.phone_number
        )
        performer.performer_specialization_id = PerformerSpecialization.objects.get(
            performer_specialization_id=validated_data.get(
                "performer_specialization_id"
            ).performer_specialization_id
        )
        performer.save()
        return instance


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "address",
            "latitude",
            "longitude",
            "avatar",
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["role"] = RoleSerializer(instance.role_id).data.get("role", None)
        response["on_site"] = (datetime.now(timezone.utc) - instance.date_joined).days
        return response


class CustomerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validators.validate_password]
    )

    class Meta:
        model = Customer
        extra_kwargs = {"password": {"write_only": True}}
        fields = ("username", "email", "password", "phone_number")

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Customer(**validated_data, role_id=Role.objects.get(role="CUST"))
        user.set_password(password)
        user.save()
        return user


class PerformerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validators.validate_password]
    )
    performer_specialization_id = serializers.CharField(required=True)
    avg_price_per_hour = serializers.FloatField(required=True)

    class Meta:
        model = Performer
        extra_kwargs = {
            "password": {"write_only": True},
        }
        fields = (
            "username",
            "email",
            "password",
            "phone_number",
            "avg_price_per_hour",
            "performer_specialization_id",
            "latitude",
            "longitude",
        )

    def create(self, validated_data):
        print(validated_data)
        password = validated_data.pop("password")
        performer_specialization_id = validated_data.pop("performer_specialization_id")
        user = Performer(
            **validated_data,
            role_id=Role.objects.get(role="PERF"),
            performer_specialization_id=PerformerSpecialization.objects.get(
                performer_specialization=performer_specialization_id
            ),
        )
        user.set_password(password)
        user.save()
        return user


class PerformerShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Performer
        fields = (
            "id",
            "username",
            "latitude",
            "longitude",
            "avatar",
        )


class PerformerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Performer
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "latitude",
            "longitude",
            "avg_price_per_hour",
            "description",
            "avatar",
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["specialization"] = PerformerSpecializationSerializer(
            instance.performer_specialization_id
        ).data
        response["role"] = RoleSerializer(instance.role_id).data.get("role", None)
        response["status"] = PerformerStatusSerializer(instance.status_is).data.get(
            "performer_status", None
        )
        response["on_site"] = (datetime.now(timezone.utc) - instance.date_joined).days
        return response


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validators.validate_password]
    )
    repeat_password = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs["password"] != attrs["repeat_password"]:
            raise serializers.ValidationError("Password fields didn't match.")

        return attrs

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is not correct")
        return value

    class Meta:
        model = User
        fields = ("old_password", "password", "repeat_password")

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()

        return instance
