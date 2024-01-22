from rest_framework import generics
from .models import TitleObject,NameObject
from .serializers import TitleObjectSerializer,NameObjectSerializer
from django.shortcuts import render
from .forms import TitleSearchForm
from rest_framework.views import APIView
from rest_framework_csv.renderers import CSVRenderer
from rest_framework.response import Response
from django.db.models import Q


class TitleBasicList(generics.ListAPIView):
    serializer_class = TitleObjectSerializer
    queryset = TitleObject.objects.all()
    renderer_classes = (CSVRenderer, ) 

    def get_queryset(self):

        queryset = TitleObject.objects.all()

        return queryset

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
   
class NameObjectDetailView(generics.ListAPIView):
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
