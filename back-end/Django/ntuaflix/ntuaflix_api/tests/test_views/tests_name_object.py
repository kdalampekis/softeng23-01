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
        self.name_object =NameObject.objects.create(
        nconst = 'nm1',
        primaryName ='Name1',
        imgUrl = 'example.url/1',
        birthYear = 2000,
        deathYear = 2020,
        primaryProfession='Actor,Director',
        titleID ='tt1,tt11',
        category = 'Actor,Writer'
        )


        self.name_object_two =NameObject.objects.create(
        nconst = 'nm2',
        primaryName ='Name2',
        imgUrl = 'example.url/1',
        birthYear = 2000,
        deathYear = 2020,
        primaryProfession='Actor,Director',
        titleID ='tt1,tt11',
        category = 'Actor,Writer'
        )


        self.name_object_three =NameObject.objects.create(
        nconst = 'nm3',
        primaryName ='Name3',
        imgUrl = 'example.url/1',
        birthYear = 2000,
        deathYear = 2020,
        primaryProfession='Actor,Director',
        titleID ='tt1,tt11',
        category = 'Actor,Writer'
        )

        
        self.name_object_four =NameObject.objects.create(
        nconst = 'nm4',
        primaryName ='Name4',
        imgUrl = 'example.url/1',
        birthYear = 2000,
        deathYear = 2020,
        primaryProfession='Actor,Director',
        titleID ='tt1,tt11',
        category = 'Actor,Writer'
        )

        self.url_name_objects = reverse('name-basic-list')  
        self.url_search_name = reverse('search-name')
        self.url_name_bio = reverse('name-detail', kwargs={'nameID': self.name_object.nconst})  

# name/
# NameObjectView
    def test_get_name_objects(self):

        
        response = self.client.get(self.url_name_objects)
        name_objects = NameObject.objects.all()
        serializer = NameObjectSerializer(name_objects, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data, serializer.data)

# name/<str:nameID>/
# NameBiography
    def test_get_name_biography_active_user(self):
        
        self.client.credentials(HTTP_AUTHORIZATION=self.active_user_token.key)
        # Continue with the test as before
        response = self.client.get(self.url_name_bio)
        
        queryset = NameObject.objects.filter(nconst=self.name_object.nconst)
        serializer = NameObjectSerializer(queryset, many=True)        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        
    def test_get_name_biography_invalid_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token invalidtokenhere')
        response = self.client.get(self.url_name_bio)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)  # Assuming your view correctly handles unauthorized access

        
    def test_get_name_biography_inactive_user(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.inactive_user_token.key)
        # Continue with the test as before
        response = self.client.get(self.url_name_bio)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)  # Assuming your view blocks inactive users



# searchname/
# # SearchNameView




    def test_search_with_valid_query(self):
        """
        Ensure we can search for a name object with a valid query by an active user.
        """
        self.client.credentials(HTTP_AUTHORIZATION=self.active_user_token.key)
        response = self.client.get(self.url_search_name, {'name': 'Name'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_queryset = NameObject.objects.filter(primaryName__icontains='Name')
        serializer = NameObjectSerializer(expected_queryset, many=True)
        
        # Compare the API response with the direct query results
        self.assertEqual(response.data, serializer.data)

    def test_search_no_query_provided(self):
        """
        Ensure the search form is rendered if no query is provided.
        """
        self.client.credentials(HTTP_AUTHORIZATION=self.active_user_token.key)
        response = self.client.get(self.url_search_name)
        
        # This test assumes you're returning HTML content when no query is provided
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Assert the response contains your search form (adjust as necessary)
        self.assertIn('search_name.html', [t.name for t in response.templates])

    def test_search_inactive_user(self):
        """
        Ensure search is denied for inactive users.
        """
        self.client.credentials(HTTP_AUTHORIZATION=self.inactive_user_token.key)
        response = self.client.get(self.url_search_name, {'name': 'Name'})
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    