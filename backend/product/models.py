from django.db import models
from django.conf import settings

# from account.models import User

# from django.contrib.auth import get_user_model

# Create your models here.

# user = get_user_model()

User = settings.AUTH_USER_MODEL


class Category(models.Model):
    name = models.CharField(max_length=220)
    image = models.ImageField(upload_to="category_images", null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Product(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=250)
    detail = models.TextField()
    category = models.ManyToManyField(Category, blank=True)
    price = models.FloatField()
    discount = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_discounted_price(self):
        if self.discount:
            return self.price - (self.price * self.discount / 100)

    def get_all_categories(self):
        category_names = []
        categories = self.category.all()
        for c in categories:
            category = {}
            category["id"] = c.id
            category["name"] = c.name
            category_names.append(category)
        return category_names


class Product_image(models.Model):
    product = models.ForeignKey(
        Product, related_name="product_image", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="product_images")
    description = models.TextField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return f"product_image of {self.product.name}"


class Size(models.Model):
    product = models.ForeignKey(Product, related_name="sizes", on_delete=models.CASCADE)
    size = models.IntegerField()

    def __str__(self):
        return str(self.size)


class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} variant of {self.product.name}"


class Variant_image(models.Model):
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="variant_images")
    description = models.TextField(max_length=1000, null=True, blank=True)

    def _str__(self):
        return f"variant_image of {self.variant.name}"


# class Category_image(models.Model):
#     category = models.ForeignKey(
#         Category, related_name="category_image", on_delete=models.CASCADE
#     )
#     image = models.ImageField(upload_to="category_images")
#     description = models.TextField(null=True, blank=True)

#     # def __str__(self):
#     #     return f"category_image of {self.category.name}"
#     def __str__(self):
#         return self.image.url
