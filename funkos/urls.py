# funkos/urls.py
from django.urls import path
from .views import FunkoListCreate, FunkoRetrieveUpdateDestroy

urlpatterns = [
    path('funkos/', FunkoListCreate.as_view(), name='funko-list-create'),
    path('funkos/<int:pk>/', FunkoRetrieveUpdateDestroy.as_view(), name='funko-retrieve-update-destroy'),
]