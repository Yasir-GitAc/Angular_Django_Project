FROM python:3.10.4-slim-bullseye

# LABEL maintainer=""

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


WORKDIR /dj_backend
#copy requirment to /tmp/requirment
COPY ./requirements.txt /tmp/requirements.txt
#copy backend folder to /shop_backend
COPY . /dj_backend
EXPOSE 8000

RUN pip install -r /tmp/requirements.txt && \
    rm -rf /tmp && \
    adduser \
        --disabled-password \
        --no-create-home \
        django-user


# to run this gunicorn command i removed command of runserver from compose file... this is the cmd "
#command: sh -c "python manage.py runserver 0.0.0.0:8000""
#gunicorn cmd updated...
CMD ["gunicorn", "--config", "gunicorn_config.py", "shop_backend.wsgi:application"]

USER django-user
