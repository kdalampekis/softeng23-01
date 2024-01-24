# import bcrypt
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils import timezone

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
    averageRating=models.DecimalField(max_digits=3, decimal_places=2)
    numVotes=models.IntegerField(blank=True,null=True)
    nconsts=models.TextField(blank=True, null=True)
    categories=models.TextField(blank=True, null=True)
    primaryName=models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'titleObject'  # Use the exact table name from the database

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
        db_table = 'nameObject'  # Use the exact table name from the database

    def __str__(self):
        return self.primaryName



# Το παρακάτω ΔΕΝ είναι ίδιο με τον πίνακα της βάσης.
# Στις γραμμές με σχόλια βρίσκονται οι στήλες που υπάρχουν στην βάση.
# Η δομή του CustomUser είναι τέτοια για να στηθούν τα Login/Logout.

# ///////////////////////////////////////////////////////////////////////////////////////////////////
    
#   ΑΠΟ ΕΔΩ ΚΑΙ ΚΑΤΩ ΕΧΕΙ ΟΛΑ ΤΑ TABLES ΤΗΣ SQL ΣΥΜΦΩΝΑ ΜΕ ΤΑ ΔΕΔΟΜΕΝΑ ΠΟΥ ΜΑΣ ΕΧΟΥΝ ΔΩΘΕΙ
#   ΠΧ TITLEAKA,TITLEBASIC,...

class TitleBasic(models.Model):
    tconst = models.CharField(max_length=10, primary_key=True)
    titleType = models.CharField(max_length=255, blank=True, null=True)
    primaryTitle = models.CharField(max_length=255, blank=True, null=True)
    originalTitle = models.CharField(max_length=255, blank=True, null=True)
    isAdult = models.IntegerField()
    startYear = models.IntegerField()  # 'year' in MySQL typically corresponds to an integer in Django
    endYear = models.IntegerField(blank=True, null=True)  # Assuming this can be NULL
    runtimeMinutes = models.IntegerField(blank=True, null=True)
    genres = models.CharField(max_length=255, blank=True, null=True)
    img_url_asset = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'TitleBasic'  

    def __str__(self):
        return self.primaryTitle

class TitleAka(models.Model):
    aka_Id = models.AutoField(primary_key=True)
    tconst = models.CharField(max_length=10)  # Assuming this might be a foreign key to another table
    ordering = models.IntegerField()
    title = models.CharField(max_length=255)
    region = models.CharField(max_length=255, blank=True, null=True)  # Assuming region can be optional
    language = models.CharField(max_length=255, blank=True, null=True)  # Assuming language can be optional
    types = models.CharField(max_length=255, blank=True, null=True)  # Assuming types can be optional
    attributes = models.CharField(max_length=255, blank=True, null=True)  # Assuming attributes can be optional
    isOriginalTitle = models.IntegerField()

    class Meta:
        db_table = 'TitleAka'  

    def __str__(self):
        return self.title
    
class Name(models.Model):
    nconst = models.CharField(max_length=10, primary_key=True)
    primaryName = models.CharField(max_length=255, blank=True, null=True)
    birthYear = models.IntegerField(blank=True, null=True)
    deathYear = models.IntegerField(blank=True, null=True)
    primaryProfession = models.CharField(max_length=255, blank=True, null=True)
    knownForTitles = models.CharField(max_length=255, blank=True, null=True)
    imgUrl = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'Name'  

    def __str__(self):
        return self.primaryName or 'Unknown Name'



class Crew(models.Model):
    tconst = models.CharField(max_length=10, primary_key=True)
    directors = models.CharField(max_length=255, blank=True, null=True)
    writers = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'Crew'  

    def __str__(self):
        return f"Crew for {self.tconst}"


class Episode(models.Model):
    tconst = models.CharField(max_length=10, primary_key=True)
    parentTconst = models.CharField(max_length=11)  # Assuming this might be a foreign key to another table
    seasonNumber = models.IntegerField(blank=True, null=True)
    episodeNumber = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'Episode'  

    def __str__(self):
        return f"Episode {self.episodeNumber} of Season {self.seasonNumber} ({self.tconst})"

class Principal(models.Model):
    workas_Id = models.AutoField(primary_key=True)
    tconst = models.CharField(max_length=10)  # This might be a ForeignKey to another table
    ordering = models.IntegerField()
    nconst = models.CharField(max_length=10)  # This might also be a ForeignKey
    category = models.CharField(max_length=25, blank=True, null=True)
    job = models.CharField(max_length=255, blank=True, null=True)
    characters = models.CharField(max_length=255, blank=True, null=True)
    img_url_asset = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'Principal'  

    def __str__(self):
        return f"{self.category} - {self.nconst}"

class Rating(models.Model):
    tconst = models.CharField(max_length=10, primary_key=True)
    averageRating = models.FloatField(blank=True, null=True)
    numVotes = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'Rating'  

    def __str__(self):
        return f"Rating {self.averageRating} for {self.tconst}"
    
