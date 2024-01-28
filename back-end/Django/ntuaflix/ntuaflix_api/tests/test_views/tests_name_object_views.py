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

# name/
# NameObjectView
    def test_get_name_objects(self):

        url = reverse('name-basic-list')  
        response = self.client.get(url)
        name_objects = NameObject.objects.all()
        serializer = NameObjectSerializer(name_objects, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data, serializer.data)

# name/<str:nameID>/
# NameBiography
    def test_get_name_biography(self):
        url = reverse('name-detail', kwargs={'nameID': self.name_object.nconst})
        response = self.client.get(url)
        queryset = NameObject.objects.filter(nconst=self.name_object.nconst)
        serializer = NameObjectSerializer(queryset, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
     
# searchname/
# SearchNameView
    def test_search_name(self):
        url = reverse('search-name')  
        # //////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
        response = self.client.get(url, {'name': 'Name'})
        queryset = NameObject.objects.filter(primaryName__icontains='Name')
        serializer = NameObjectSerializer(queryset, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

        # /////////////////////////////////////////////////////////Empty input//////////////////////////////////////////////
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    