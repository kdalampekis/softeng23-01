# Generated by Django 5.0.1 on 2024-01-27 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ntuaflix_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='titleobject',
            name='averageRating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True),
        ),
    ]