from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ntuaflix_api.models import *
from ntuaflix_api.serializers import *
from django.db.models import Q
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
class TitleBasicListViewTest(APITestCase):
# Setting Up the TitleObject objects that will be used for testing
    def setUp(self):

        self.active_user = User.objects.create_user(username='activeUser', password='test123', is_active=True)
        self.active_user_token = Token.objects.create(user=self.active_user)

        self.inactive_user = User.objects.create_user(username='inactiveUser', password='false', is_active=False)
        self.inactive_user_token = Token.objects.create(user=self.inactive_user)

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

        self.url_search_by_name = reverse('SearchByName') 
        self.url_search_by_year = reverse('SearchByYear')
        self.url_filter_titles = reverse('filtered-title-objects')
        self.url_title_objects = reverse('title-basic-list')  
        self.url_search_title = reverse('search-title')
        self.url_title_detail = reverse('title-detail', kwargs={'titleID': self.title_object.tconst})  

# Testing the TitleBasicList view 
# Used on the url title/
    def test_get_title_basic_list(self):
        response = self.client.get(self.url_title_objects)

        # Get the data from the database to compare with the response
        titles = TitleObject.objects.all()
        serializer = TitleObjectSerializer(titles, many=True)

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response data matches the serialized data
        self.assertEqual(response.data, serializer.data)

# Testing the view: TitleDetailView 
# Used for the ulr : title/<str:titleID>/
    def test_get_title_details(self):
        """
        Ensure an active user can retrieve a title detail successfully.
        """
        self.client.credentials(HTTP_AUTHORIZATION=self.active_user_token.key)
        response = self.client.get(self.url_title_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add more assertions here to validate the response data

        """
        Ensure an inactive user cannot retrieve title details.
        """
        self.client.credentials(HTTP_AUTHORIZATION=self.inactive_user_token.key)
        response = self.client.get(self.url_title_detail)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        """
        Ensure an active user gets a 404 when requesting a non-existent title.
        """
        self.client.credentials(HTTP_AUTHORIZATION=self.active_user_token.key)
        invalid_url = reverse('title-detail', kwargs={'titleID': 'invalid'})
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



# Testing the view: SearchTitleView 
# Used for the ulr : searchtitle/
    def test_search_title(self):
    # /////////////////////////////////////////////////test_search_with_valid_query_active_user///////////////////////////////////////////////////////////////////
        self.client.credentials(HTTP_AUTHORIZATION=self.active_user_token.key)
        response = self.client.get(self.url_search_title, {'title': 'movie'})
        
        expected_queryset = TitleObject.objects.filter(originalTitle__icontains='Test')
        serializer = TitleObjectSerializer(expected_queryset, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)        
        self.assertEqual(response.data, serializer.data)  # Ensure actual data matches


    # /////////////////////////////////////////////////test_search_no_results///////////////////////////////////////////////////////////////////

        self.client.credentials(HTTP_AUTHORIZATION=self.active_user_token.key)
        response = self.client.get(self.url_search_title, {'title': '9999'})
        
        # Assuming the view redirects or renders a search form
        self.assertEqual(response.data, {"error": "No Movies Found"})
        # Check for the presence of 'search_title.html' if rendering a template

    # /////////////////////////////////////////////////////test_search_inactive_user///////////////////////////////////////////////////////////////
        self.client.credentials(HTTP_AUTHORIZATION=self.inactive_user_token.key)
        response = self.client.get(self.url_search_title, {'title': 'movie'})
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

# Testing the view: FilteredTitleObjectsView 
# Used for the ulr : bygenre/
    def test_filtered_titles(self):
        
        # def test_successful_filtering(self):
        self.client.credentials(HTTP_AUTHORIZATION= self.active_user_token.key)
        query_params = {
            'genre': 'Comedy',
            'minimumrating': '7.0',
            'yearfrom': '2000',
            'yearto': '2010'
        }
        response = self.client.get(self.url_filter_titles,query_params)
         # Expected filtered queryset
        query = Q(genres__icontains=query_params['genre']) & Q(averageRating__gte=query_params['minimumrating']) & Q(startYear__gte=query_params['yearfrom']) & Q(endYear__lte=query_params['yearto'])
        title_objects = TitleObject.objects.filter(query)
        serializer = TitleObjectSerializer(title_objects, many=True)

        # Check response status and data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data) # Assuming only one title matches the criteria

        # def test_no_filtering_criteria_provided(self):
        self.client.credentials(HTTP_AUTHORIZATION= self.active_user_token.key)
        response = self.client.get(self.url_filter_titles)
        # Assuming your view correctly handles rendering the search criteria form
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Here you'd check for specific form elements or a message indicating no criteria were provided
        # This may need to be adjusted based on your actual response for this case

        # def test_inactive_user_access(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.inactive_user_token.key)
        response = self.client.get(self.url_filter_titles)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        
       

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



# # Testing the view: SearchByYear 
# # Used for the ulr : SearchByYear/
    def test_filtering_by_year(self):
        """
        Ensure we can filter titles by year and retrieve the correct results.
        """
        response = self.client.get(self.url_search_by_year, {'year': '2000'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        expected_queryset = TitleObject.objects.filter(startYear=2000)
        serializer = TitleObjectSerializer(expected_queryset, many=True)
        
        self.assertEqual(response.data, serializer.data)  # Compare the response data to the expected serialized data

    # def test_no_year_provided(self):
        """
        Ensure the view returns the search form when no 'year' query parameter is provided.
        """
        response = self.client.get(self.url_search_by_year)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Testing the view: SearchByName 
# Used for the ulr : SearchByName/
    def test_search_by_name(self):
        
        # //////////////////////////////////////////////////////Top Rated WITH amount of movies//////////////////////////////////////////////////////////////
        response = self.client.get(self.url_search_by_name, {'name': 'Name', 'toprated': 'true','newest': 'false', 'number': '2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = TitleObject.objects.filter(primaryName__icontains='Name').order_by('-averageRating')[:2]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # //////////////////////////////////////////////////////Newest WITH amount of movies/////////////////////////////////////////////
        response = self.client.get(self.url_search_by_name, {'name': 'Name', 'toprated': 'false','newest': 'true', 'number': '1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = TitleObject.objects.filter(primaryName__icontains='Name').order_by('-startYear')[:1]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # //////////////////////////////////////////////////////Top Rated withOUT amount of movies//////////////////////////////////////////////////////////////
        response = self.client.get(self.url_search_by_name, {'name': 'Name', 'toprated': 'true','newest': 'false', 'number': ''})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = TitleObject.objects.filter(primaryName__icontains='Name').order_by('-averageRating')[:1]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # //////////////////////////////////////////////////////Newest withOUT amount of movies/////////////////////////////////////////////
        response = self.client.get(self.url_search_by_name, {'name': 'Name', 'toprated': 'false','newest': 'true', 'number': ''})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = TitleObject.objects.filter(primaryName__icontains='Name').order_by('-startYear')[:1]
        serializer = TitleObjectSerializer(queryset, many=True)
        self.assertEqual(response.data, serializer.data)

        # ////////////////////////////////////////////////////// Conflict ////////////////////////////////////////////////        
        response = self.client.get(self.url_search_by_name, {'name': 'Actor', 'toprated': 'true', 'newest': 'true'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # /////////////////////////////////////////////////////////Empty input//////////////////////////////////////////////
        response = self.client.get(self.url_search_by_name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////