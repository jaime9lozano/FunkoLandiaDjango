# funkos/views.py
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import filters
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
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


@csrf_exempt
@api_view(['POST'])
def custom_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        response = JsonResponse({'error': 'Both username and password are required'}, status=400)
        response["Access-Control-Allow-Credentials"] = "true"
        return response

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        response = JsonResponse({'message': 'Login successful'}, status=200)
        response["Access-Control-Allow-Credentials"] = "true"
        return response
    else:
        response = JsonResponse({'error': 'Invalid username or password'}, status=400)
        response["Access-Control-Allow-Credentials"] = "true"
        return response


@login_required
def comprar_funko(request, pk):
    funko = get_object_or_404(Funko, pk=pk)

    if request.method == 'POST':
        cantidad_solicitada = int(request.POST.get('cantidad'))

        if cantidad_solicitada > funko.cantidad:
            messages.error(request, f"No hay suficiente stock. Disponible: {funko.cantidad}")
        else:
            # Reducir la cantidad en el stock
            funko.cantidad -= cantidad_solicitada
            funko.save()
            messages.success(request, f"Has comprado {cantidad_solicitada} de {funko.nombre}")
            return redirect('funko-list-create')  # Redirige a la lista de Funkos o a otra vista

    return render(request, 'comprar_funko.html', {'funko': funko})
