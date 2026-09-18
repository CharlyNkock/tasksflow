from rest_framework.routers import DefaultRouter, path
from .views import RegisterView, RegisterView, TaskViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
] + router.urls