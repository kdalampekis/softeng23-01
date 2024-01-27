from django.test import TestCase
from ntuaflix_api.models import *

class TitleObjectTest(TestCase):
    def setUp(self):
        # Setup run before every test method.
        NameProfile.objects.create(
            ActorName = 'Lisa Ann',
            ActorNconst = 'nm12345',
            AllGenres = 'the best ones',
        )

    def test_name_profile_creation(self):
        name_profile = NameProfile.objects.get(ActorNconst = 'nm12345')
        self.assertEqual(name_profile.ActorNconst,'nm12345')
        self.assertEqual(name_profile.AllGenres,'the best ones')
        

    # You can add more test methods as needed to cover different aspects of your model
