from django.contrib import admin
from .models import *


class TitleBasicsAdmin(admin.ModelAdmin):
    list_display = ['originalTitle', 'tconst']
    search_fields = ['originalTitle', 'tconst']
    list_filter = ['startYear', 'endYear', 'isAdult']

class TitleAkaAdmin(admin.ModelAdmin):
    list_display = ['tconst', 'ordering', 'title', 'region', 'language', 'isOriginalTitle']
    search_fields = ['tconst__originalTitle', 'title', 'region', 'language']
    list_filter = ['region', 'language', 'isOriginalTitle']

class NamesAdmin(admin.ModelAdmin):
    list_display = ['nconst', 'primaryName', 'birthYear', 'deathYear', 'primaryProfession']
    search_fields = ['nconst', 'primaryName', 'primaryProfession']
    list_filter = ['birthYear', 'deathYear']

class CrewAdmin(admin.ModelAdmin):
    list_display = ['tconst', 'directors', 'writers']
    search_fields = ['tconst__originalTitle', 'directors', 'writers']

class EpisodeAdmin(admin.ModelAdmin):
    list_display = ['tconst', 'parentTconst', 'seasonNumber', 'episodeNumber']
    search_fields = ['tconst__originalTitle', 'parentTconst', 'seasonNumber', 'episodeNumber']
    list_filter = ['seasonNumber']

class PrincipalsAdmin(admin.ModelAdmin):
    list_display = ['tconst', 'ordering', 'nconst', 'category', 'job', 'characters']
    search_fields = ['tconst__originalTitle', 'nconst__primaryName', 'category', 'job', 'characters']
    list_filter = ['category']

class RatingAdmin(admin.ModelAdmin):
    list_display = ['tconst', 'averageRating', 'numVotes']
    search_fields = ['tconst__originalTitle', 'averageRating', 'numVotes']

class LikesAdmin(admin.ModelAdmin):
    list_display = ['tconst', 'userId', 'liked']
    search_fields = ['tconst__originalTitle', 'userId__username']
    list_filter = ['liked']


admin.site.register(TitleBasic,TitleBasicsAdmin)
admin.site.register(TitleAka, TitleAkaAdmin)
admin.site.register(Names, NamesAdmin)
admin.site.register(Crew, CrewAdmin)
admin.site.register(Episode, EpisodeAdmin)
admin.site.register(Principals, PrincipalsAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(Likes, LikesAdmin)