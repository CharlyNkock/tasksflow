from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Task(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.pk:
            old = Task.objects.filter(pk=self.pk).first()
            if old:
                if not old.completed and self.completed:
                    self.completed_at = timezone.now()
                elif not self.completed:
                    self.completed_at = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title