# Generated by Django 5.0.1 on 2024-01-24 15:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('administrator', '0002_rename_name_names'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Principal',
            new_name='Principals',
        ),
        migrations.AlterModelTable(
            name='names',
            table='Names',
        ),
        migrations.AlterModelTable(
            name='principals',
            table='Principals',
        ),
    ]
