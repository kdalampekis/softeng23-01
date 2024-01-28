from django.contrib import admin
from .models import TitleObject, NameObject, NameProfile


class TitleObjectAdmin(admin.ModelAdmin):
    list_display = ['tconst', 'titleType', 'originalTitle', 'startYear', 'endYear', 'averageRating', 'numVotes', 'primaryName']
    search_fields = ['tconst', 'originalTitle', 'primaryName']
    list_filter = ['titleType', 'startYear', 'endYear']

class NameObjectAdmin(admin.ModelAdmin):
    list_display = ['nconst', 'primaryName', 'birthYear', 'deathYear', 'primaryProfession']
    search_fields = ['nconst', 'primaryName', 'primaryProfession']
    list_filter = ['birthYear', 'deathYear']

class NameProfileAdmin(admin.ModelAdmin):
    list_display = ['ActorName', 'ActorNconst', 'AllGenres']
    search_fields = ['ActorName', 'ActorNconst', 'AllGenres']


admin.site.register(TitleObject, TitleObjectAdmin)
admin.site.register(NameObject, NameObjectAdmin)
admin.site.register(NameProfile, NameProfileAdmin)
