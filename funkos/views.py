# funkos/views.py
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework import filters
from django.db.models import Q
from django.urls import reverse
from .models import Funko, Categoria
from .serializers import FunkoSerializer, CategoriaSerializer

class FunkoListCreate(generics.ListCreateAPIView):
    serializer_class = FunkoSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['nombre']
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        queryset = Funko.objects.all()
        nombre = self.request.query_params.get('nombre', None)
        if nombre:
            queryset = queryset.filter(Q(nombre__icontains=nombre))
        return queryset

class FunkoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Funko.objects.all()
    serializer_class = FunkoSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

class CategoriaListCreate(generics.ListCreateAPIView):
    serializer_class = CategoriaSerializer
    filter_backends = [filters.OrderingFilter]
    search_fields = ['nombre']
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        queryset = Categoria.objects.all()
        nombre = self.request.query_params.get('nombre', None)
        if nombre:
            queryset = queryset.filter(Q(nombre__icontains=nombre))
        return queryset

class CategoriaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

def custom_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')  # Usar .get para evitar errores si la clave no existe
        password = request.POST.get('password')
        if username and password:  # Asegurarse de que ambos campos estén presentes
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                if user.is_staff:
                    return HttpResponseRedirect(reverse('admin:index'))
                else:
                    return HttpResponseRedirect('/api/funkos')  # Redirige a la página principal
            else:
                # Añadir un mensaje de error si la autenticación falla
                return render(request, 'registration/login.html', {'error': 'Invalid username or password'})
    return render(request, 'registration/login.html')

