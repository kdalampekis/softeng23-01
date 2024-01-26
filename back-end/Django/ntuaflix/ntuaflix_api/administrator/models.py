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
    ordering = models.IntegerField(blank=True, null=True)
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
    tconst = models.ForeignKey(TitleBasic, on_delete=models.CASCADE)  # ForeignKey
    parentTconst = models.CharField(max_length=10)
    seasonNumber = models.IntegerField(blank=True, null=True)
    episodeNumber = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'Episode'
        constraints = [
            models.UniqueConstraint(fields=['tconst', 'parentTconst'], name='unique_tconst_parentTconst')
        ]

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


#   //////////////////////// OBJECT FUNCTIONS ////////////////////////

    
def UploadTitleObject(request):
    TitleObject.objects.all().delete()
    title_ids = TitleBasic.objects.all()
    for tconst in title_ids:
        titleType = tconst.titleType
        originalTitle = tconst.originalTitle
        img_url_asset = tconst.img_url_asset if tconst.img_url_asset is not None else '\\N'
        startYear = tconst.startYear
        endYear = tconst.endYear
        genres = tconst.genres
        
        titleAkas = TitleAka.objects.filter(tconst=tconst)
        titles_list = list(titleAkas.values_list('title', flat=True))
        titles = ', '.join(str(title) if title is not None else '' for title in titles_list)
        regions_list = list(titleAkas.values_list('region', flat=True))
        regions = ', '.join(str(region) if region is not None else '' for region in regions_list)
        
        titlePrincipals=Principals.objects.filter(tconst=tconst)
        nconsts_list = list(titlePrincipals.values_list('nconst', flat=True))
        nconsts = ', '.join(str(n) if n is not None else '' for n in nconsts_list)
        categories_list = list(titlePrincipals.values_list('category', flat=True))
        categories = ', '.join(str(category) if category is not None else '' for category in categories_list)
        
        primaryName_list = []
        for nconst in nconsts_list:
            name=Names.objects.get(nconst=nconst).primaryName
            primaryName_list.append(name)
        primaryName = ', '.join(str(name) if name is not None else '' for name in primaryName_list)
        
        try:
            titleRatings = Rating.objects.get(tconst=tconst)
            averageRating = titleRatings.averageRating
            numVotes = titleRatings.numVotes
        except Rating.DoesNotExist:
            # Handle the case when Rating for the specified tconst does not exist
            averageRating = None  # Set to None or another default value
            numVotes = None  # Set to None or another default value
        
        try:
            title_obj, created = TitleObject.objects.get_or_create(
            tconst=tconst,
            defaults={
                'titleType': titleType,
                'originalTitle': originalTitle,
                'img_url_asset': img_url_asset,
                'startYear': startYear,
                'endYear': endYear,
                'genres': genres,
                'titles': titles,
                'regions': regions,
                'nconsts': nconsts,
                'categories': categories,
                'primaryName': primaryName,
                'averageRating': averageRating,
                'numVotes': numVotes,
            }
        )
            if created:
                print(f"Created new record for tconst: {tconst}")
            else:
                print(f"Record for tconst {tconst} already exists, skipping.")

        except TitleBasic.MultipleObjectsReturned:
            print(f"Multiple records found for tconst: {tconst}, skipping.")


def UploadNameObject(request):
    NameObject.objects.all().delete()
    name_ids = Names.objects.all()
    for nconst in name_ids:
        primaryName = nconst.primaryName
        imgUrl = nconst.imgUrl if nconst.imgUrl is not None else '\\N'
        birthYear = nconst.birthYear
        deathYear = nconst.deathYear
        primaryProfession = nconst.primaryProfession
        
        titlePrincipals=Principals.objects.filter(nconst=nconst)
        tconsts_list = list(titlePrincipals.values_list('tconst', flat=True))
        titleID = ', '.join(str(title) if title is not None else '' for title in tconsts_list)
        categories_list = list(titlePrincipals.values_list('category', flat=True))
        category = ', '.join(str(cat) if cat is not None else '' for cat in categories_list)
        
        try:
            name_obj, created = NameObject.objects.get_or_create(
            nconst=nconst,
            defaults={
                'primaryName': primaryName,
                'imgUrl': imgUrl,
                'birthYear': birthYear,
                'deathYear': deathYear,
                'primaryProfession': primaryProfession,
                'titleID': titleID,
                'category': category,
            }
        )

            if created:
                print(f"Created new record for tconst: {nconst}")
            else:
                print(f"Record for tconst {nconst} already exists, skipping.")

        except TitleBasic.MultipleObjectsReturned:
            print(f"Multiple records found for tconst: {nconst}, skipping.")

        
def UploadNameProfile(request):
    NameProfile.objects.all().delete()
    name_ids = Names.objects.all()

    for ActorNconst in name_ids:
        ActorName = ActorNconst.primaryName
        
        categories_list = []
        tconsts_list = []

        try:
            titlePrincipals = Principals.objects.filter(nconst=ActorNconst)
            tconsts_list = list(titlePrincipals.values_list('tconst', flat=True))

            for tconst in tconsts_list:
                categories = TitleBasic.objects.get(tconst=tconst).genres
                if categories is None:
                    continue

                categories = categories.split(',')

                for category in categories:
                    if category not in categories_list:
                        categories_list.append(category)

            if not categories_list:
                continue

            categories_list.sort()
            AllGenres = ', '.join(category for category in categories_list)

            name_prof, created = NameProfile.objects.get_or_create(
                ActorNconst=ActorNconst,
                defaults={
                    'ActorName': ActorName,
                    'AllGenres': AllGenres,
                }
            )

            if created:
                print(f"Created new record for nconst: {ActorNconst}")
            else:
                print(f"Record for nconst {ActorNconst} already exists, skipping.")

        except (Principals.DoesNotExist, TitleBasic.DoesNotExist) as e:
            # Log the exception and continue with the next iteration
            print(f"Error processing nconst {ActorNconst}: {e}")
            continue

        except IntegrityError as e:
            # Check if the IntegrityError is due to the unique constraint on ActorName
            if 'UNIQUE constraint failed: nameProfile.ActorName' in str(e):
                print(f"NameProfile with nconst {ActorName} already exists, skipping.")
                continue
            else:
                # Log the integrity error and continue with the next iteration
                print(f"IntegrityError for nconst {ActorNconst}, skipping.")
                continue