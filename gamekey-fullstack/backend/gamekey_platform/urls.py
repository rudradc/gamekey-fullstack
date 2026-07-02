from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter
from games.viewsets import GameViewSet, PublisherViewSet
from games.views import register, create_order

def api_root(request):
    return JsonResponse({
        "status": "ok", 
        "message": "GameKey Backend API is running successfully. Please use /api/ for data endpoints."
    })

# Initialize the router and register our viewsets
router = DefaultRouter()
router.register(r'games', GameViewSet)
router.register(r'publishers', PublisherViewSet)

urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', register),
    path('api/orders/', create_order),
]
