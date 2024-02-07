from django.test import TestCase
from ntuaflix_api.models import *

class TitleObjectTest(TestCase):
    def setUp(self):
        # Setup run before every test method.
        NameObject.objects.create(
            nconst = 'nm12345',
            primaryName = 'Name',
            imgUrl = 'imgUrlLink',
            birthYear = 2020,
            deathYear = 2021,
            primaryProfession = 'primaryProfession',
            titleID = 'tt12345',
            category = 'category',

        )

    def test_name_object_creation(self):
        name_object = NameObject.objects.get(nconst = 'nm12345')
        
        self.assertEqual(name_object.primaryName,'Name',)
        self.assertEqual(name_object.imgUrl, 'imgUrlLink',)
        self.assertEqual(name_object.birthYear, 2020)
        self.assertEqual(name_object.deathYear, 2021)
        self.assertEqual(name_object.primaryProfession,'primaryProfession',)
        self.assertEqual(name_object.titleID,'tt12345')
        self.assertEqual(name_object.category,'category')
        

    # You can add more test methods as needed to cover different aspects of your model
