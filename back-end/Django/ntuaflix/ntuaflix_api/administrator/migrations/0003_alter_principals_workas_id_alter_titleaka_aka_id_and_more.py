# Generated by Django 5.0.1 on 2024-01-27 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administrator', '0002_delete_workas_alter_crew_tconst_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='principals',
            name='workas_Id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='titleaka',
            name='aka_Id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='titleaka',
            name='ordering',
            field=models.IntegerField(default=0),
        ),
    ]
