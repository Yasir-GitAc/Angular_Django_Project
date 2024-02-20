from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return HttpResponse(
        "hello world docker up wait_for_bd didn't work,gunicorn seems to be working, yes gunicorn working, now from dev server "
    )
