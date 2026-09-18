from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed', 'owner')
    list_filter = ('completed', 'owner')
    search_fields = ('title', 'description', 'owner__username')

admin.site.register(Task, TaskAdmin)