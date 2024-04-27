from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import Product, Product_image, Category, Size


class CategorySerializer(serializers.ModelSerializer):
    # category_image = serializers.StringRelatedField(many=True)

    class Meta:
        model = Category
        fields = [
            "pk",
            "name",
            "image",
            "description",
        ]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_image
        fields = [
            "pk",
            "product",
            "image",
            "description",
        ]


# class SizeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Size
#         fields = ["size"]


class SizeSerializer(serializers.Serializer):
    size = serializers.IntegerField()


def product_creation_handler(validated_data):
    print(validated_data)
    images = validated_data.pop("upload_images", None)
    category_inputs = validated_data.pop("category_inputs", None)
    size_inputs = validated_data.pop("size_inputs", None)
    product = Product.objects.create(**validated_data)
    if images:
        print("images received")
        for image in images:
            Product_image.objects.create(product=product, image=image)
    else:
        print("no image received")
    if category_inputs:
        print("category_inputs received", category_inputs)
        for cat_input in category_inputs:
            print(cat_input)
            category_ids = cat_input.split(",")
            print(category_ids)
            for id in category_ids:
                cat = Category.objects.get(pk=int(id))
                if cat:
                    product.category.add(cat)
                    print("cat added")

    if size_inputs:
        # use this code when using list field
        print("size_inputs received:", size_inputs)
        for size_input in size_inputs:
            print(size_input)
            sizes = size_input.split(",")
            print(sizes)
            for size in sizes:
                print("size_from_inner_most_loop", size)
                Size.objects.create(product=product, size=size)
                print("obj created")

    return product


# TODO: category handled next variant
class ProductSerializer(serializers.ModelSerializer):
    discount_price = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name="product:product_detail", lookup_field="pk"
    )
    product_image = ProductImageSerializer(many=True, read_only=True)
    upload_images = serializers.ListField(
        child=serializers.ImageField(required=False), write_only=True
    )
    category = CategorySerializer(many=True, read_only=True)
    category_inputs = serializers.ListField(
        child=serializers.CharField(required=False), write_only=True
    )
    sizes = SizeSerializer(many=True, read_only=True)
    size_inputs = serializers.ListField(
        child=serializers.CharField(required=False), write_only=True
    )

    class Meta:
        model = Product
        fields = [
            "pk",
            "url",
            "name",
            "detail",
            "category",
            "product_image",
            "upload_images",
            "category_inputs",
            "sizes",
            "size_inputs",
            "price",
            "discount",
            "discount_price",
        ]

    def create(self, validated_data):
        product = product_creation_handler(validated_data)
        return product

    def get_discount_price(self, obj):
        return obj.get_discounted_price()

    # def get_category(self, obj):
    #     return obj.get_all_categories()
