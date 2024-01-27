from django.test import TestCase
from ntuaflix_api.models import TitleObject  # Import your TitleObject model

class TitleObjectTest(TestCase):
    def setUp(self):
        # Setup run before every test method.
        TitleObject.objects.create(
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

    def test_title_object_creation(self):
        title_object = TitleObject.objects.get(tconst='tt1234567')
        self.assertEqual(title_object.titleType, 'movie')
        self.assertEqual(title_object.originalTitle, 'Test Movie')
        self.assertEqual(title_object.img_url_asset, 'url/to/image.jpg')
        self.assertEqual(title_object.startYear, 2020)
        self.assertEqual(title_object.endYear, 2021)
        self.assertEqual(title_object.titles, 'Title1,Title2')
        self.assertEqual(title_object.regions, 'US,UK')
        self.assertEqual(title_object.genres, 'Comedy,Drama')
        self.assertEqual(title_object.averageRating, 7.5)
        self.assertEqual(title_object.numVotes, 100)
        self.assertEqual(title_object.nconsts, 'nm0000001,nm0000002')
        self.assertEqual(title_object.categories,'Director,Actor')
        self.assertEqual(title_object.primaryName,'Name1,Name2')
            

    # You can add more test methods as needed to cover different aspects of your model
