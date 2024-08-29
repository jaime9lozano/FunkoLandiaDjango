# funkos/views.py
from rest_framework import generics
from rest_framework import filters
from django.db.models import Q
from .models import Funko
from .serializers import FunkoSerializer

class FunkoListCreate(generics.ListCreateAPIView):
    serializer_class = FunkoSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['nombre']

    def get_queryset(self):
        queryset = Funko.objects.all()
        nombre = self.request.query_params.get('nombre', None)
        if nombre:
            queryset = queryset.filter(Q(nombre__icontains=nombre))
        return queryset

class FunkoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Funko.objects.all()
    serializer_class = FunkoSerializer
