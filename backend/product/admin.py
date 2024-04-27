from django.contrib import admin
from .models import (
    Category,
    Product,
    Product_image,
    Size,
    Variant,
    Variant_image,
)

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Product_image)
admin.site.register(Size)
admin.site.register(Variant)
admin.site.register(Variant_image)
