from rest_framework import serializers


class ComplaintSerializer(serializers.Serializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    user = serializers.IntegerField()
    username = serializers.CharField(max_length=255)
    role = serializers.IntegerField()
