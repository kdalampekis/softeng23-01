from django.db import models

class TitleObject(models.Model):
    tconst = models.CharField(max_length=10, primary_key=True)
    titleType = models.CharField(max_length=255, blank=True, null=True)
    originalTitle = models.CharField(max_length=255, blank=True, null=True)
    img_url_asset = models.CharField(max_length=255, blank=True, null=True)
    startYear = models.IntegerField(blank=True, null=True)
    endYear = models.IntegerField(blank=True, null=True)
    titles = models.TextField(blank=True, null=True)  # Aggregated titles
    regions = models.TextField(blank=True, null=True)  # Aggregated regions
    genres = models.TextField(blank=True, null=True)
    averageRating=models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    numVotes=models.IntegerField(blank=True,null=True)
    nconsts=models.TextField(blank=True, null=True)
    categories=models.TextField(blank=True, null=True)
    primaryName=models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'titleObject'

    def __str__(self):
        return self.originalTitle

class NameObject(models.Model):
    nconst = models.CharField(max_length=10, primary_key=True)
    primaryName = models.CharField(max_length=255, blank=True, null=True)
    imgUrl = models.CharField(max_length=255, blank=True, null=True)
    birthYear = models.IntegerField(blank=True, null=True)
    deathYear = models.IntegerField(blank=True, null=True)
    primaryProfession = models.CharField(max_length=255, blank=True, null=True)
    titleID = models.TextField(blank=True, null=True)  # Aggregated titles
    category = models.TextField(blank=True, null=True)  # Aggregated regions

    class Meta:
        manage: False
        db_table = 'nameObject'

    def __str__(self):
        return self.primaryName


class NameProfile(models.Model):
    ActorName = models.CharField(max_length=50, primary_key=True)
    ActorNconst = models.CharField(max_length=20, blank=True, null=True)
    AllGenres = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'nameProfile'
    def __str__(self):
        return self.ActorName