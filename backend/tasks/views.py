from rest_framework import viewsets, permissions, generics
from .models import Task
from django.contrib.auth.models import User
from .serializers import TaskSerializer, RegisterSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner = self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)