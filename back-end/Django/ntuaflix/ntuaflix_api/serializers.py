from rest_framework import serializers
from .models import TitleObject,NameObject

class TitleObjectSerializer(serializers.ModelSerializer):
    titlesAkas = serializers.SerializerMethodField()
    genres = serializers.SerializerMethodField()
    principals=serializers.SerializerMethodField()
    rating=serializers.SerializerMethodField()

    class Meta:
        model = TitleObject
        fields = ['tconst', 'titleType', 'originalTitle', 'img_url_asset', 'startYear', 'endYear', 'genres','titlesAkas','principals','rating']  # You can choose to exclude 'titles' and 'regions' if they should not appear separately.
        # fields = [field.name for field in model._meta.fields if field.name not in ('titles', 'regions')]
    
    def get_titlesAkas(self, obj):
        # Split the titles and regions by ', ' and zip them into tuples
        akaTitle = obj.titles.split(',') if obj.titles else []
        regionAbbrev = obj.regions.split(',') if obj.regions else []
        # Combine the titles and regions into a list of dictionaries
        return [{'akaTitle': akaTitle, 'regionAbbrev': regionAbbrev} for akaTitle, regionAbbrev in zip(akaTitle, regionAbbrev)]

    def get_genres(self, obj):
        return obj.genres.split(',') if obj.genres else []

    
    def get_principals(self, obj):
        # Split the titles and regions by ', ' and zip them into tuples
        nameID = obj.nconsts.split(',') if obj.nconsts else []
        name = obj.primaryName.split(',') if obj.primaryName else []
        category= obj.categories.split(',') if obj.categories else []
        # Combine the titles and regions into a list of dictionaries
        return [{'nameID': nameID, 'name': name, 'category':category} for nameID, name,category in zip(nameID, name,category)]

    def get_rating(self, obj):
        return [{'avRating': obj.averageRating, 'nVotes': obj.numVotes}]

        # return ['genresTitle':genresTitle


class NameObjectSerializer(serializers.ModelSerializer):

    nameTitles=serializers.SerializerMethodField()

    class Meta:
        model = NameObject
        fields = ['nconst','primaryName','imgUrl','birthYear','deathYear','primaryProfession','nameTitles']

    def get_nameTitles(self,obj):
        titleID=obj.titleID.split(',') if obj.titleID else []
        
        category=obj.category.split(',') if obj.category else []

        return [{'titleID':titleID,'category':category} for titleID,category in zip(titleID,category)]

