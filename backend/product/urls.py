from django.urls import path
from . import views

app_name = "product"

urlpatterns = [
    path("test_view/", views.test_view, name="test_view"),
    path("", views.product_list_api_view.as_view(), name="product_list"),
    path(
        "<int:pk>/",
        views.product_detail_api_view.as_view(),
        name="product_detail",
    ),
    path(
        "create_product/",
        views.product_create_api_view.as_view(),
        name="product_create",
    ),
    path(
        "update_product/<int:pk>/",
        views.product_update_api_view.as_view(),
        name="product_update",
    ),
    path(
        "delete_product/<int:pk>/",
        views.product_delete_api_view.as_view(),
        name="product_delete",
    ),
    path(
        "categories/",
        views.category_list_api_view.as_view(),
        name="category_list",
    ),
    path(
        "create_category/",
        views.category_create_api_view.as_view(),
        name="category_create",
    ),
]
