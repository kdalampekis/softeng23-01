# Generated by Django 5.0.1 on 2024-01-25 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Crew',
            fields=[
                ('tconst', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('directors', models.CharField(blank=True, max_length=255, null=True)),
                ('writers', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'Crew',
            },
        ),
        migrations.CreateModel(
            name='Episode',
            fields=[
                ('tconst', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('parentTconst', models.CharField(max_length=11)),
                ('seasonNumber', models.IntegerField(blank=True, null=True)),
                ('episodeNumber', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Episode',
            },
        ),
        migrations.CreateModel(
            name='Names',
            fields=[
                ('nconst', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('primaryName', models.CharField(blank=True, max_length=255, null=True)),
                ('birthYear', models.IntegerField(blank=True, null=True)),
                ('deathYear', models.IntegerField(blank=True, null=True)),
                ('primaryProfession', models.CharField(blank=True, max_length=255, null=True)),
                ('knownForTitles', models.CharField(blank=True, max_length=255, null=True)),
                ('imgUrl', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'Names',
            },
        ),
        migrations.CreateModel(
            name='Principals',
            fields=[
                ('workas_Id', models.AutoField(primary_key=True, serialize=False)),
                ('tconst', models.CharField(max_length=10)),
                ('ordering', models.IntegerField()),
                ('nconst', models.CharField(max_length=10)),
                ('category', models.CharField(blank=True, max_length=25, null=True)),
                ('job', models.CharField(blank=True, max_length=255, null=True)),
                ('characters', models.CharField(blank=True, max_length=255, null=True)),
                ('img_url_asset', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'Principals',
            },
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('tconst', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('averageRating', models.FloatField(blank=True, null=True)),
                ('numVotes', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Rating',
            },
        ),
        migrations.CreateModel(
            name='TitleAka',
            fields=[
                ('aka_Id', models.AutoField(primary_key=True, serialize=False)),
                ('tconst', models.CharField(max_length=10)),
                ('ordering', models.IntegerField()),
                ('title', models.CharField(max_length=255)),
                ('region', models.CharField(blank=True, max_length=255, null=True)),
                ('language', models.CharField(blank=True, max_length=255, null=True)),
                ('types', models.CharField(blank=True, max_length=255, null=True)),
                ('attributes', models.CharField(blank=True, max_length=255, null=True)),
                ('isOriginalTitle', models.IntegerField()),
            ],
            options={
                'db_table': 'TitleAka',
            },
        ),
        migrations.CreateModel(
            name='TitleBasic',
            fields=[
                ('tconst', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('titleType', models.CharField(blank=True, max_length=255, null=True)),
                ('primaryTitle', models.CharField(blank=True, max_length=255, null=True)),
                ('originalTitle', models.CharField(blank=True, max_length=255, null=True)),
                ('isAdult', models.IntegerField()),
                ('startYear', models.IntegerField()),
                ('endYear', models.IntegerField(blank=True, null=True)),
                ('runtimeMinutes', models.IntegerField(blank=True, null=True)),
                ('genres', models.CharField(blank=True, max_length=255, null=True)),
                ('img_url_asset', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'TitleBasic',
            },
        ),
        migrations.CreateModel(
            name='Workas',
            fields=[
                ('workas_Id', models.AutoField(primary_key=True, serialize=False)),
                ('tconst', models.CharField(max_length=10)),
                ('ordering', models.IntegerField()),
                ('nconst', models.CharField(max_length=10)),
                ('category', models.CharField(blank=True, max_length=25, null=True)),
                ('job', models.CharField(blank=True, max_length=255, null=True)),
                ('characters', models.CharField(blank=True, max_length=255, null=True)),
                ('img_url_asset', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'workas',
            },
        ),
    ]
