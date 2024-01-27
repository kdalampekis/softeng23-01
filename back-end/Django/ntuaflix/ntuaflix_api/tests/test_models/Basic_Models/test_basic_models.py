from django.test import TestCase
from ntuaflix_api.administrator.models import *

class BasicModelsTest(TestCase):
    def setUp(self):
        # Setup a test instance of TitleObject
        self.title_basic = TitleBasic.objects.create(
            tconst="tt1234567",
            titleType="movie",
            primaryTitle="Test Primary Title",
            originalTitle="Test Original Title",
            isAdult=0,
            startYear=2020,
            endYear=2021,
            runtimeMinutes=120,
            genres="Comedy,Drama",
            img_url_asset="https://example.com/image.jpg"
        )

        self.title_aka = TitleAka.objects.create(
            tconst=self.title_basic.tconst,
            ordering=1,
            title="Alternate Title",
            region="US",
            language="en",
            types="Main",
            attributes="",
            isOriginalTitle=0
        )

        self.names = Names.objects.create(
            nconst="nm1234567",
            primaryName="John Doe",
            birthYear=1980,
            deathYear=2020,
            primaryProfession="Actor",
            knownForTitles="tt1234567,tt1234568",
            imgUrl="https://example.com/image.jpg"
        )

        self.crew = Crew.objects.create(
            tconst=self.title_basic.tconst,
            directors="John Doe",
            writers="Jane Smith"
        )

        self.episode = Episode.objects.create(
            tconst=self.title_basic.tconst,
            parentTconst="tt1234568",
            seasonNumber=1,
            episodeNumber=2
        )


        self.workas = Principals.objects.create(
            tconst=self.title_basic.tconst,
            nconst=self.name,
            ordering=1,
            category="Director",
            job="Directing",
            characters="Main Character",
            img_url_asset="https://example.com/image.jpg"
        )


        





    def test_title_object_creation(self):
        # Test that the title object is created correctly
        self.assertEqual(self.title_object.tconst, "tt1234567")
        self.assertEqual(self.title_object.titleType, "movie")
        self.assertEqual(self.title_object.originalTitle, "Test Movie Title")
        self.assertEqual(self.title_object.img_url_asset,"https://example.com/image.jpg")
        self.assertEqual(self.title_object.startYear,2020)
        self.assertEqual(self.title_object.endYear,2021)
        self.assertEqual(self.title_object.titles,"Title1,Title2")
        self.assertEqual(self.title_object.regions,"US,UK")
        self.assertEqual(self.title_object.genres,"Comedy,Drama")
        self.assertEqual(self.title_object.averageRating,8.5)
        self.assertEqual(self.title_object.numVotes,100)
        self.assertEqual(self.title_object.nconsts,"nm0000001,nm0000002")
        self.assertEqual(self.title_object.categories,"Actor,Director" )
        self.assertEqual(self.title_object.primaryName,"John Doe,Jane Smith")

        
        
        # Add more assertions for other fields



    def test_names_creation(self):
        # Test that the Names object is created correctly
        self.assertEqual(self.names.nconst, "nm1234567")
        self.assertEqual(self.names.primaryName, "John Doe")
        self.assertEqual(self.names.birthYear, 1980)
        self.assertEqual(self.names.deathYear, 2020)
    

    def test_episode_creation(self):
        # Test that the Episode object is created correctly
        self.assertEqual(self.episode.tconst.tconst, "tt1234567")
        self.assertEqual(self.episode.parentTconst, "tt1234568")
        self.assertEqual(self.episode.seasonNumber, 1)
        self.assertEqual(self.episode.episodeNumber, 2)


    def test_principals_creation(self):
        # Test that the Workas object is created correctly
        self.assertEqual(self.workas.tconst.tconst, "tt1234567")
        self.assertEqual(self.workas.nconst.nconst, "nm1234567")
        self.assertEqual(self.workas.ordering, 1)
        self.assertEqual(self.workas.category, "Director")
        self.assertEqual(self.workas.job, "Directing")
        self.assertEqual(self.workas.characters, "Main Character")
    # You can add more tests to cover different aspects of your model, such as custom methods, model validation, etc.
