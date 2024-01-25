from rest_framework import generics
from .serializers import TitleObjectSerializer,NameObjectSerializer
from django.shortcuts import render
from .forms import TitleSearchForm
from rest_framework.views import APIView
# from rest_framework_csv.renderers import CSVRenderer
from rest_framework.response import Response
from django.db.models import Q
from collections import Counter
from .models import *

class TitleBasicList(generics.ListAPIView):
    serializer_class = TitleObjectSerializer
    queryset = TitleObject.objects.all()
    # renderer_classes = (CSVRenderer, ) 

    def get_title(self):
        serializer_class = TitleObjectSerializer
        title = TitleObject.objects.all()

        return title

class TitleDetailView(generics.ListAPIView):
    serializer_class = TitleObjectSerializer

    def get_queryset(self):

        titleID = self.kwargs.get('titleID')
        return TitleObject.objects.filter(tconst=titleID)

class SearchTitleView(APIView):

    def get(self, request):
        title_query = request.GET.get('title', None)
        if title_query:
            title_objects = TitleObject.objects.filter(originalTitle__icontains=title_query)
            serializer = TitleObjectSerializer(title_objects, many=True)
            return Response(serializer.data)
        else:
            # Render the search form if no query is provided
            return render(request, 'search_title.html')

class FilteredTitleObjectsView(APIView):

    def get(self, request, *args, **kwargs):
        # Retrieve query parameters
        genre = request.GET.get('genre', None)
        minimum_rating = request.GET.get('minimumrating', None)
        year_from = request.GET.get('yearfrom', None)
        year_to = request.GET.get('yearto', None)

        if genre:
            # Start building the query
            query = Q()
            if genre:
                query &= Q(genres__icontains=genre)
            if minimum_rating:
                query &= Q(averageRating__gte=minimum_rating)
            if year_from:
                query &= Q(startYear__gte=year_from)
            if year_to:
                query &= Q(endYear__lte=year_to)

            # Execute the query
            title_objects = TitleObject.objects.filter(query)
            
            # Serialize the queryset
            serializer = TitleObjectSerializer(title_objects, many=True)
        else:
            return render(request,'search_criteria.html')
        # Return the response
        return Response(serializer.data)

class NameObjectView(generics.ListAPIView):
    serializer_class = NameObjectSerializer

    def get_queryset(self):


        queryset = NameObject.objects.all()

        return queryset
   
class NameBiography(generics.ListAPIView):
    serializer_class = NameObjectSerializer

    def get_queryset(self):

        nameID = self.kwargs.get('nameID')
        return NameObject.objects.filter(nconst=nameID)

class SearchNameView(APIView):
    def get_search_by_name(self, request):
        name_query = request.GET.get('name', None)
        if name_query:
            name_objects = NameObject.objects.filter(primaryName__icontains=name_query)
            serializer = NameObjectSerializer(name_objects, many=True)
            return Response(serializer.data)
        else:
            # Render the search form if no query is provided
            return render(request, 'search_name.html')

class SearchByGenre(APIView):

    def get(self, request, *args, **kwargs):
        # Retrieve query parameters
        genre = request.GET.get('genre', None)  
        number = request.GET.get('number',None)     
        toprated = request.GET.get('toprated',None)
        # Check if the 'genre' parameter is provided
        if genre:
            # Filter by genre
            queryset = TitleObject.objects.filter(genres__icontains=genre)
            # Serialize the queryset

            if toprated=='true':
                if number:
                    queryset = queryset.order_by('-averageRating')[:int(number)]

                else:
                    context = {
                    'error_message': "You have to input a number."
                    }
                    return render(request, 'SearchByGenre.html', context)

            else:
                if number:
                    queryset = queryset[:int(number)]
                    

            serializer = TitleObjectSerializer(queryset, many=True)
            # Return the serialized data
        else:
            # If 'genre' is not provided, render the search criteria form
            return render(request, 'SearchByGenre.html')

        return Response(serializer.data)

class SearchByYear(APIView):

    def get(self, request, *args, **kwargs):
        # Retrieve query parameters
        year = request.GET.get('year', None)        
        # Check if the 'genre' parameter is provided
        if year:
            # Filter by genre
            queryset = TitleObject.objects.filter(startYear=year)
            # Serialize the queryset
            serializer = TitleObjectSerializer(queryset, many=True)

            # Return the serialized data
        else:
            # If 'genre' is not provided, render the search criteria form
            return render(request, 'SearchByYear.html')

        return Response(serializer.data)

class SearchByName(APIView):

    def get(self, request, *args, **kwargs):
        # Retrieve query parameters
        name = request.GET.get('name', None)        
        toprated = request.GET.get('toprated',None)
        newest = request.GET.get('newest',None)
        number = request.GET.get('number',None)
        # Check if the 'genre' parameter is provided
        if name:
            # Filter by genre
            queryset = TitleObject.objects.filter(primaryName__icontains=name)
            
            if (toprated == 'true' and newest== 'true'):
                context = {
                'error_message': "You can only choose 'Earliest Release' or 'Top Rated', not both."
                }
                return render(request, 'SearchByName.html', context)

            if number:
                if toprated=='true':
                    queryset = queryset.order_by('-averageRating')[:int(number)]
                # Serialize the queryset
                
                if newest=='true':
                    queryset = queryset.order_by('-startYear')[:int(number)]
            else:
                if toprated=='true':
                    queryset = queryset.order_by('-averageRating')[:1]
                # Serialize the queryset
                
                if newest=='true':
                    queryset = queryset.order_by('-startYear')[:1]



            serializer = TitleObjectSerializer(queryset, many=True)
            # Return the serialized data
        else:
            # If 'genre' is not provided, render the search criteria form
            return render(request, 'SearchByName.html')

        return Response(serializer.data)

class NameProfileView(APIView):

    def get(self, request, *args, **kwargs):

        name = request.GET.get('name', '')  # Default to an empty string if not provided

        actors_genre_percentages = {}

        if name:
            filtered_profiles = NameProfile.objects.filter(ActorName__icontains=name)

            for profile in filtered_profiles:
                if profile.AllGenres:
                    # Split the genres and strip whitespace from each genre individually
                    genres = [genre.strip() for genre in profile.AllGenres.split(',')]
                    # Count each genre
                    genre_counts = Counter(genres)

                    # Calculate the total number of genre occurrences
                    total_genres = sum(genre_counts.values())

                    # Calculate the percentage for each genre
                    genre_percentages = {genre: (count / total_genres) * 100 for genre, count in genre_counts.items()}
                    
                    # Assign the result to the actor's name
                    actors_genre_percentages[profile.ActorName] = genre_percentages

            # Return the percentages as JSON or render your template
            return JsonResponse(actors_genre_percentages)

        else:
            return render(request, 'UserProfile.html')

# ////////////////////////////////////////////////////////////////////////
# ///////////////   ADMIN FUNCTIONALITIES   //////////////////////////////
    

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import transaction, DatabaseError
import MySQLdb

from .administrator.models import *

def reset_all(request):
    try:
        with transaction.atomic():
            # List all models that you want to reset
            NameObject.objects.all().delete()
            TitleObject.objects.all().delete()
            TitleAka.objects.all().delete()
            Principals.objects.all().delete()
            Workas.objects.all().delete()
            Names.objects.all().delete()
            Episode.objects.all().delete()
            Rating.objects.all().delete()
            Crew.objects.all().delete()
            TitleBasic.objects.all().delete()
            # Add similar lines for all other models you have

        return JsonResponse({"status": "OK Everything"})
    except DatabaseError as e:
        return JsonResponse({"status": "failed", "reason": str(e)})






