from django.test import TestCase
from  ntuaflix_api.models import TitleObject  # Replace with your actual model import
from ntuaflix_api.serializers import TitleObjectSerializer

class TitleObjectSerializerTest(TestCase):
    def setUp(self):
        # Create a TitleObject instance for testing
        self.title_object = TitleObject.objects.create(
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

    def test_title_object_serialization(self):
        # Test the serialization process
        serializer = TitleObjectSerializer(self.title_object)
        expected_data = {
            'tconst': 'tt1234567',
            'titleType': 'movie',
            'originalTitle': 'Test Movie',
            'img_url_asset': 'url/to/image.jpg',
            'startYear': 2020,
            'endYear': 2021,
            'genres': ['Comedy', 'Drama'],
            'titlesAkas': [
                {'akaTitle': 'Title1', 'regionAbbrev': 'US'},
                {'akaTitle': 'Title2', 'regionAbbrev': 'UK'}
            ],
            'principals': [
                {'nameID': 'nm0000001', 'name': 'Name1', 'category': 'Director'},
                {'nameID': 'nm0000002', 'name': 'Name2', 'category': 'Actor'}
            ],
            'rating': [{'avRating': 7.5, 'nVotes': 100}]
        }
        self.assertEqual(serializer.data, expected_data)

    # Add more tests as needed for edge cases or invalid data
