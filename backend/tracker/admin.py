from django.contrib import admin
from .models import User, Category, Resource, ProgressLog

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Resource)
admin.site.register(ProgressLog)
