from django.urls import path
from . import views

app_name = "product"

urlpatterns = [
    path("test/", views.test, name="test"),
]
