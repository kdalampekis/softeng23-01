import bcrypt
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

class CustomUser(AbstractUser):
    # userId=models.AutoField(primary_key=True)
    # username = models.CharField(max_length=255)
    # passwordHash = models.CharField(max_length=255)
    email = models.EmailField()
    dateOfBirth = models.DateField()
    country = models.CharField(max_length=255)
    # gender = models.IntegerField()

    # is_active = models.BooleanField(default=True)
    # is_staff = models.BooleanField(default=False)
    # is_superuser = models.BooleanField(default=False)

    # last_login=models.DateTimeField(default=None)

    # date_joined = models.DateTimeField(default=timezone.now)


    # USERNAME_FIELD = 'username'
    # EMAIL_FIELD = 'email'
    # REQUIRED_FIELDS = ['email']

    # class Meta:
    #     db_table = 'user'



    # def set_password(self, raw_password):
    #     self.passwordHash = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
    #     self.save()

    # def check_password(self, raw_password):
    #     return bcrypt.checkpw(raw_password.encode('utf-8'), self.passwordHash.encode('utf-8'))
    

    def __str__(self):
        return self.email


