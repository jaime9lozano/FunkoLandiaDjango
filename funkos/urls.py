# funkos/urls.py
from django.urls import path
from .views import FunkoListCreate, FunkoRetrieveUpdateDestroy, CategoriaListCreate, CategoriaRetrieveUpdateDestroy

urlpatterns = [
    path('funkos/', FunkoListCreate.as_view(), name='funko-list-create'),
    path('funkos/<int:pk>/', FunkoRetrieveUpdateDestroy.as_view(), name='funko-retrieve-update-destroy'),
    path('categorias/', CategoriaListCreate.as_view(), name='categoria-list-create'),
    path('categorias/<int:pk>/', CategoriaRetrieveUpdateDestroy.as_view(), name='categoria-retrieve-update-destroy'),
]