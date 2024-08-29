# funkos/models.py
from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Funko(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, related_name='funkos', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
