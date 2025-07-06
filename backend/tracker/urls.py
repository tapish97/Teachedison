from django.urls import path
from .views import PingView, RegisterView, ResourceListCreateView, ResourceDetailView, MarkCompleteView, SummaryView

urlpatterns = [
    path('ping/', PingView.as_view(), name='ping'),
    path('register/', RegisterView.as_view(), name='register'),
    path('resources/', ResourceListCreateView.as_view(), name='resource-list-create'),
    path('resources/<int:id>/', ResourceDetailView.as_view(), name='resource-detail'),
    path('resources/<int:id>/mark-complete/', MarkCompleteView.as_view(), name='mark-complete'),
    path('resources/summary/', SummaryView.as_view(), name='resource-summary'),
]
