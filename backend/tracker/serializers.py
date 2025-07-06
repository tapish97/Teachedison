from rest_framework import serializers
from .models import Category, Resource, ProgressLog, User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ResourceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True)
    category = serializers.CharField(source='category.name', read_only=True)
    completed = serializers.BooleanField(read_only=True)  # ✅ Add this

    class Meta:
        model = Resource
        fields = [
            'id',
            'title',
            'type',
            'description',
            'category_name',
            'category',
            'completed',  # ✅ include in response
        ]

    def create(self, validated_data):
        category_name = validated_data.pop('category_name')
        user = self.context['request'].user
        category, _ = Category.objects.get_or_create(
            name=category_name,
            defaults={'created_by': user}
        )
        return Resource.objects.create(category=category, user=user, **validated_data)
    
class ProgressLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressLog
        fields = ['id', 'completion_status', 'time_spent', 'completion_date']

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
