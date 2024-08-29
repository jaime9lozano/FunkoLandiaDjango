# funkos/serializers.py
from rest_framework import serializers
from .models import Funko, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class FunkoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())

    class Meta:
        model = Funko
        fields = ['id', 'nombre', 'categoria']

    def create(self, validated_data):
        # Puedes hacer algo especial aquí si necesitas
        return Funko.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Actualiza el campo 'categoria' si se proporciona en validated_data
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.categoria = validated_data.get('categoria', instance.categoria)
        instance.save()
        return instance
