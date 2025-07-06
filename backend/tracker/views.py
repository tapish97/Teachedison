from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum, Case, When, FloatField, Exists, OuterRef
from .models import Resource, Category, ProgressLog, User
from .serializers import ResourceSerializer, CategorySerializer, ProgressLogSerializer, UserRegisterSerializer
from django.db.models import Q
from django.db.models import F
from rest_framework.generics import ListCreateAPIView


class PingView(APIView):
    def get(self, request):
        return Response({"message": "pong ✅"})

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

class ResourceListCreateView(ListCreateAPIView):  # ✅ CORRECT
    serializer_class = ResourceSerializer

    def get_queryset(self):
        user = self.request.user
        return Resource.objects.filter(user=user).annotate(
            completed=Exists(
                ProgressLog.objects.filter(
                    user=user,
                    resource=OuterRef('pk'),
                    completion_status=True
                )
            )
        )


class ResourceDetailView(generics.RetrieveAPIView):
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        user = self.request.user
        return Resource.objects.filter(user=user).annotate(
            completed=Exists(
                ProgressLog.objects.filter(
                    user=user,
                    resource=OuterRef('pk'),
                    completion_status=True
                )
            )
        )
class MarkCompleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, id):
        resource = Resource.objects.get(id=id, user=request.user)
        data = request.data
        log, created = ProgressLog.objects.update_or_create(
            resource=resource, user=request.user,
            defaults={
                'completion_status': True,
                'time_spent': data.get('time_spent', 0),
                'completion_date': data.get('completion_date')
            })
        return Response({'status': 'marked complete'})

class SummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # All resources created by user
        resources = Resource.objects.filter(user=user)

        summary = resources.values('category__name').annotate(
            total=Count('id'),
            completed=Count(
                'progresslog__id',
                filter=Q(progresslog__completion_status=True, progresslog__user=user)
            ),
            time_spent=Sum(
                Case(
                    When(progresslog__user=user, then=F('progresslog__time_spent')),
                    default=0,
                    output_field=FloatField()
                )
            )
        )

        return Response(summary)

