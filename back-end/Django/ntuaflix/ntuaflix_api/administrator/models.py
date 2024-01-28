from django.db import models
from ..models import *
from django.db import IntegrityError


class TitleBasic(models.Model):
    tconst = models.CharField(max_length=10, primary_key=True)
    titleType = models.CharField(max_length=255, blank=True, null=True)
    primaryTitle = models.CharField(max_length=255, blank=True, null=True)
    originalTitle = models.CharField(max_length=255, blank=True, null=True)
    isAdult = models.IntegerField(blank=True, null=True)
    startYear = models.IntegerField(blank=True, null=True)
    endYear = models.IntegerField(blank=True, null=True)
    runtimeMinutes = models.IntegerField(blank=True, null=True)
    genres = models.CharField(max_length=255, blank=True, null=True)
    img_url_asset = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'TitleBasic'  

    def get_tconst(self):
        # Return the tconst value of the instance
        return self.tconst

    def __str__(self):
        return self.tconst


class TitleAka(models.Model):
    aka_Id = models.AutoField(primary_key=True)
    tconst = models.ForeignKey(TitleBasic, on_delete=models.CASCADE)  # ForeignKey
    ordering = models.IntegerField(default=0)
    title = models.CharField(max_length=255, null=True)
    region = models.CharField(max_length=255, blank=True, null=True)
    language = models.CharField(max_length=255, blank=True, null=True)
    types = models.CharField(max_length=255, blank=True, null=True)
    attributes = models.CharField(max_length=255, blank=True, null=True)
    isOriginalTitle = models.IntegerField()
    
    class Meta:
        db_table = 'TitleAka'  

    def __str__(self):
        return self.title
    
    
class Names(models.Model):
    nconst = models.CharField(max_length=10, primary_key=True)
    primaryName = models.CharField(max_length=255, blank=True, null=True)
    birthYear = models.IntegerField(blank=True, null=True)
    deathYear = models.IntegerField(blank=True, null=True)
    primaryProfession = models.CharField(max_length=255, blank=True, null=True)
    knownForTitles = models.CharField(max_length=255, blank=True, null=True)
    imgUrl = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'Names'  

    def __str__(self):
        return self.nconst


class Crew(models.Model):
    tconst = models.OneToOneField(TitleBasic, primary_key=True, on_delete=models.CASCADE)  # ForeignKey
    directors = models.CharField(max_length=255, blank=True, null=True)
    writers = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'Crew'  

    def __str__(self):
        return f"Crew for {self.tconst}"


class Episode(models.Model):
    tconst = models.OneToOneField(TitleBasic, primary_key=True, on_delete=models.CASCADE)  # ForeignKey
    parentTconst = models.CharField(max_length=10)
    seasonNumber = models.IntegerField(blank=True, null=True)
    episodeNumber = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'Episode'

    def __str__(self):
        return f"Episode {self.episodeNumber} of Season {self.seasonNumber} ({self.tconst})"


class Principals(models.Model):
    workas_Id = models.AutoField(primary_key=True)
    tconst = models.ForeignKey(TitleBasic, on_delete=models.CASCADE)  # ForeignKey
    ordering = models.IntegerField(blank=True, null=True)
    nconst = models.ForeignKey(Names, on_delete=models.CASCADE)  # ForeignKey
    category = models.CharField(max_length=25, blank=True, null=True)
    job = models.CharField(max_length=255, blank=True, null=True)
    characters = models.CharField(max_length=255, blank=True, null=True)
    img_url_asset = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'Principals'  

    def __str__(self):
        return f"{self.category} - {self.nconst}"


class Rating(models.Model):
    tconst = models.OneToOneField(TitleBasic, primary_key=True, on_delete=models.CASCADE)  # ForeignKey
    averageRating = models.FloatField(blank=True, null=True)
    numVotes = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'Rating'  

    def __str__(self):
        return f"Rating {self.averageRating} for {self.tconst}"