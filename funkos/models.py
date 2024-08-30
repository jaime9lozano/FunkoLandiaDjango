# funkos/models.py
from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Funko(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, related_name='funkos', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=0)  # Stock disponible
    precio = models.DecimalField(max_digits=10, decimal_places=2)  # Precio del Funko
    imagen = models.ImageField(upload_to='funkos/', blank=True, null=True)

    def __str__(self):
        return self.nombre
