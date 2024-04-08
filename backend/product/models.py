from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=220)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Category_image(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="category_images")
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"category_image of {self.category.name}"


class Product(models.Model):
    name = models.CharField(max_length=250)
    detail = models.TextField()
    category = models.ManyToManyField(Category)
    price = models.FloatField()
    discounted_price = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product_image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="product_images")
    description = models.TextField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return f"product_image of {self.product.name}"


class Size(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.IntegerField()

    def __str__(self):
        return f"size of {self.product.name} size-{self.size}"


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
