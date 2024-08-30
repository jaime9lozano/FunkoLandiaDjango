# funkos/serializers.py
from rest_framework import serializers
from .models import Funko, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

    def create(self, validated_data):
        # Puedes agregar lógica especial para la creación si es necesario
        return Categoria.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Actualiza los campos del modelo Categoria
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.save()
        return instance

class FunkoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())

    class Meta:
        model = Funko
        fields = ['id', 'nombre', 'categoria', 'precio', 'cantidad']

    def create(self, validated_data):
        # Puedes hacer algo especial aquí si necesitas
        return Funko.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Actualiza el campo 'categoria' si se proporciona en validated_data
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.categoria = validated_data.get('categoria', instance.categoria)
        instance.precio = validated_data.get('precio', instance.precio)
        instance.cantidad = validated_data.get('cantidad', instance.cantidad)
        instance.save()
        return instance
