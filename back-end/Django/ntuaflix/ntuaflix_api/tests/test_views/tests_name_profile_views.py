from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ntuaflix_api.models import *
from ntuaflix_api.serializers import *
from django.db.models import Q

from collections import Counter
from django.http import JsonResponse

class TitleBasicListViewTest(APITestCase):
# Setting Up the TitleObject objects that will be used for testing
    def setUp(self):
        # Create some instances of TitleObject for testing
        self.name_object =NameProfile.objects.create(
        ActorName = 'Actor Name',
        ActorNconst = 'nm12345',
        AllGenres = 'Drama,Comedy,Action,Thriller'
        )

    
    def test_name_profile_with_param(self):
        url = reverse('name-profile')  # Replace with the actual name used in your URL patterns
        response = self.client.get(url, {'name': 'Name'})

        # Expected response data
        filtered_profiles = NameProfile.objects.filter(ActorName__icontains='Name')
        actors_genre_percentages = {}
        for profile in filtered_profiles:
            genres = [genre.strip() for genre in profile.AllGenres.split(',')]
            genre_counts = Counter(genres)
            total_genres = sum(genre_counts.values())
            genre_percentages = {genre: (count / total_genres) * 100 for genre, count in genre_counts.items()}
            actors_genre_percentages[profile.ActorName] = genre_percentages

        expected_response = JsonResponse(actors_genre_percentages).content.decode()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), expected_response)

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Further assertions to check if NameProfile.html is rendered can be added


