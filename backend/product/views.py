from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, permissions
from .models import Product, Category, Variant
from .serializers import ProductSerializer, CategorySerializer
from .permissions import IsOwner
from rest_framework.parsers import MultiPartParser, FormParser


def test_view(request):
    data = "test_view_page"
    return render(request, "test_view.html", {"data": data})


class product_detail_api_view(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # lookup field = pk


class product_list_api_view(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class product_create_api_view(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # authentication_classes = []
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        print("request_data", self.request.data)

        category_inputs = self.request.data["category_inputs"]
        size_inputs = self.request.data["size_inputs"]
        upload_images = self.request.data.getlist(
            "upload_images"
        )  # Accessing the list of uploaded images

        print("Category Inputs:", category_inputs)
        print("Size Inputs:", size_inputs)
        print("Upload Images:", upload_images)

        if size_inputs:
            print("from if state, sizeinputs")

        serializer.save(owner=self.request.user)


class product_update_api_view(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        permissions.IsAdminUser,
        # permissions.DjangoObjectPermissions,
        IsOwner,
    ]


class product_delete_api_view(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        permissions.IsAdminUser,
    ]


class category_create_api_view(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class category_list_api_view(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class variant_list_api_view(generics.ListAPIView):
    queryset = Variant.objects.all()
