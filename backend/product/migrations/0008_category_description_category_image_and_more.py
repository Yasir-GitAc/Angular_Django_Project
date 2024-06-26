# Generated by Django 5.0.2 on 2024-04-13 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_alter_category_image_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='category',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='category_images'),
        ),
        migrations.DeleteModel(
            name='Category_image',
        ),
    ]
