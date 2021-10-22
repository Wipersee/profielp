from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    username = serializers.CharField(max_length=255)
    role = serializers.IntegerField()