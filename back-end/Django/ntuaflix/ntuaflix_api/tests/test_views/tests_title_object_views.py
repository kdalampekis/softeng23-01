from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ntuaflix_api.models import *
from ntuaflix_api.serializers import *
from django.db.models import Q

class TitleBasicListViewTest(APITestCase):
# Setting Up the TitleObject objects that will be used for testing
    def setUp(self):
        # Create some instances of TitleObject for testing
        self.title_object =TitleObject.objects.create(
            tconst='tt1234567',
            titleType='movie',
            originalTitle='Test Movie',
            img_url_asset='url/to/image.jpg',
            startYear=2020,
            endYear=2021,
            titles='Title1,Title2',
            regions='US,UK',
            genres='Comedy,Drama',
            averageRating=7.5,
            numVotes=100,
            nconsts='nm0000001,nm0000002',
            categories='Director,Actor',
            primaryName='Name1,Name2'
        )
        
        self.title_object_two =TitleObject.objects.create(
            tconst='tt4567',
            titleType='Secondmovie',
            originalTitle='Second Test Movie',
            img_url_asset='url/to/Secondimage.jpg',
            startYear=2020,
            endYear=2021,
            titles='Title1,Title2',
            regions='US,UK',
            genres='Comedy,Drama',
            averageRating=7.5,
            numVotes=100,
            nconsts='nm0000001,nm0000002',
            categories='Director,Actor',
            primaryName='Name1,Name2'
        )

        self.title_object_three =TitleObject.objects.create(
            tconst='tt123456789',
            titleType='movie',
            originalTitle='Test Movie',
            img_url_asset='url/to/image.jpg',
            startYear=2005,
            endYear=2010,
            titles='Title1,Title2',
            regions='US,UK',
            genres='Comedy,Drama',
            averageRating=8,
            numVotes=100,
            nconsts='nm0000001,nm0000002',
            categories='Director,Actor',
            primaryName='Name1,Name2'
        )

        self.title_object_four =TitleObject.objects.create(
            tconst='tt1234567891011',
            titleType='movie',
            originalTitle='Test Movie',
            img_url_asset='url/to/image.jpg',
            startYear=2000,
            endYear=2005,
            titles='Title1,Title2',
            regions='US,UK',
            genres='Comedy,Drama',
            averageRating=7.5,
            numVotes=100,
            nconsts='nm0000001,nm0000002',
            categories='Director,Actor',
            primaryName='Name1,Name2'
        )

# Testing the TitleBasicList view 
# Used on the url title/
    def test_get_title_basic_list(self):
        # Define the URL for the TitleBasicList view
        url = reverse('title-basic-list')  # Replace 'title_basic_list' with the actual name used in your URL patterns

        # Make a GET request to the view
        response = self.client.get(url)

        # Get the data from the database to compare with the response
        titles = TitleObject.objects.all()
        serializer = TitleObjectSerializer(titles, many=True)

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response data matches the serialized data
        self.assertEqual(response.data, serializer.data)

# Testing the view: TitleDetailView 
# Used for the ulr : title/<str:titleID>/
    def test_get_title_basic_list(self):
        # Define the URL for the TitleBasicList view
        url = reverse('title-detail', kwargs={'titleID': self.title_object.tconst})

        # Make a GET request to the view
        response = self.client.get(url)

        expected_serializer = TitleObjectSerializer([self.title_object], many=True)

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response data matches the serialized data
        self.assertEqual(response.data, expected_serializer.data)

# Testing the view: SearchTitleView 
# Used for the ulr : searchtitle/
    def test_search_title(self):
        # Test searching with a title query parameter
        url = reverse('search-title') + '?title=Test'
        response = self.client.get(url)

        # Filter TitleObject instances as expected by the view
        title_objects = TitleObject.objects.filter(originalTitle__icontains="Test")
        serializer = TitleObjectSerializer(title_objects, many=True)

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response data matches the serialized data
        self.assertEqual(response.data, serializer.data)

        # Test searching without a title query parameter
        url = reverse('search-title')
        response = self.client.get(url)

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Testing the view: FilteredTitleObjectsView 
# Used for the ulr : bygenre/
    def test_filtered_titles(self):
        # Define the URL for the FilteredTitleObjectsView view
        url = reverse('filtered-title-objects')  # Replace 'filtered_titles' with the actual name used in your URL patterns
        query_params = {
            'genre': 'Comedy',
            'minimumrating': '7.0',
            'yearfrom': '2000',
            'yearto': '2010'
        }
        response = self.client.get(url, query_params)

        # Expected filtered queryset
        query = Q(genres__icontains=query_params['genre']) & Q(averageRating__gte=query_params['minimumrating']) & Q(startYear__gte=query_params['yearfrom']) & Q(endYear__lte=query_params['yearto'])
        title_objects = TitleObject.objects.filter(query)
        serializer = TitleObjectSerializer(title_objects, many=True)

        # Check response status and data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

        # Test with no parameters
        url = reverse('filtered-title-objects')
        response = self.client.get(url)

        # Check that it renders the search criteria page
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add assertions to check the response content if necessary

# Testing the view: SearchByGenre 
# Used for the ulr : SearchByGenre/
    def test_search_by_genre(self):
        url = reverse('SearchByGenre')
        # //////////////////////////////////////////////////////Top Rated with amount of movies//////////////////////////////////////////////////////////////
        response = self.client.get(url, {'genre': 'Comedy', 'toprated': 'true', 'number': '1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Expected filtered queryset
        queryset = TitleObject.objects.filter(genres__icontains='Comedy').order_by('-averageRating')[:1]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # //////////////////////////////////////////////////////NON Top Rated With amount of movies////////////////////////////////////////////////
        
        response = self.client.get(url, {'genre': 'Comedy', 'toprated': 'false', 'number': '1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Expected filtered queryset
        queryset = TitleObject.objects.filter(genres__icontains='Comedy')[:1]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)
        
        # //////////////////////////////////////////////////////NON Top Rated Without amount of movies/////////////////////////////////////////////
        
        response = self.client.get(url, {'genre': 'Comedy', 'toprated': 'false', 'number': ''})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Expected filtered queryset
        queryset = TitleObject.objects.filter(genres__icontains='Comedy')
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # ///////////////////////////////////////////////////////Top Rated Without amount of Movies/////////////////////////////////////////

        response = self.client.get(url, {'genre': 'Comedy', 'toprated': 'true', 'number': ''})
        # Check response status code
        self.assertEqual(response.status_code, 200)
        # Check if the response contains the specific error message
        self.assertIn("You have to input a number.", response.content.decode())

        # /////////////////////////////////////////////////////////Empty input//////////////////////////////////////////////
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# Testing the view: SearchByYear 
# Used for the ulr : SearchByYear/
    def test_search_by_year(self):
        url = reverse('SearchByYear')  # Replace with the actual name used in your URL patterns
        response = self.client.get(url, {'year': '2000'})

        # Expected filtered queryset
        queryset = TitleObject.objects.filter(startYear=2000)
        serializer = TitleObjectSerializer(queryset, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Further assertions to check if SearchByYear.html is rendered can be added

# Testing the view: SearchByName 
# Used for the ulr : SearchByName/
    def test_search_by_name(self):
        
        url = reverse('SearchByName') 
        # //////////////////////////////////////////////////////Top Rated WITH amount of movies//////////////////////////////////////////////////////////////
        response = self.client.get(url, {'name': 'Name', 'toprated': 'true','newest': 'false', 'number': '2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = TitleObject.objects.filter(primaryName__icontains='Name').order_by('-averageRating')[:2]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # //////////////////////////////////////////////////////Newest WITH amount of movies/////////////////////////////////////////////
        response = self.client.get(url, {'name': 'Name', 'toprated': 'false','newest': 'true', 'number': '1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = TitleObject.objects.filter(primaryName__icontains='Name').order_by('-startYear')[:1]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # //////////////////////////////////////////////////////Top Rated withOUT amount of movies//////////////////////////////////////////////////////////////
        response = self.client.get(url, {'name': 'Name', 'toprated': 'true','newest': 'false', 'number': ''})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = TitleObject.objects.filter(primaryName__icontains='Name').order_by('-averageRating')[:1]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # //////////////////////////////////////////////////////Newest withOUT amount of movies/////////////////////////////////////////////
        response = self.client.get(url, {'name': 'Name', 'toprated': 'false','newest': 'true', 'number': ''})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = TitleObject.objects.filter(primaryName__icontains='Name').order_by('-startYear')[:1]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # ////////////////////////////////////////////////////// Conflict ////////////////////////////////////////////////        
        response = self.client.get(url, {'name': 'Actor', 'toprated': 'true', 'newest': 'true'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # /////////////////////////////////////////////////////////Empty input//////////////////////////////////////////////
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////