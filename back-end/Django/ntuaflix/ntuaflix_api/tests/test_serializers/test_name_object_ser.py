from rest_framework.test import APITestCase
from ntuaflix_api.models import NameObject  # Replace with your actual app name
from ntuaflix_api.serializers import NameObjectSerializer

class NameObjectSerializerTest(APITestCase):
    def setUp(self):
        # Create a NameObject instance for testing
        self.name_object = NameObject.objects.create(
            nconst='n0001234',
            primaryName='Test Name',
            imgUrl='http://example.com/image.jpg',
            birthYear=1980,
            deathYear=2020,
            primaryProfession='Actor',
            titleID='tt001, tt002',
            category='Lead, Supporting'
        )

    def test_name_object_serialization(self):
        # Test the serialization process
        serializer = NameObjectSerializer(self.name_object)
        expected_data = {
            'nconst': 'n0001234',
            'primaryName': 'Test Name',
            'imgUrl': 'http://example.com/image.jpg',
            'birthYear': 1980,
            'deathYear': 2020,
            'primaryProfession': 'Actor',
            'nameTitles': [
                {'titleID': 'tt001', 'category': 'Lead'},
                {'titleID': 'tt002', 'category': 'Supporting'}
            ]
        }
        self.assertEqual(serializer.data, expected_data)
