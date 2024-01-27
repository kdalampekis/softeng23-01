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
            tconst=self.title_basic,
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
            tconst=self.title_basic,
            directors="John Doe",
            writers="Jane Smith"
        )

        self.episode = Episode.objects.create(
            tconst=self.title_basic,
            parentTconst="tt1234568",
            seasonNumber=1,
            episodeNumber=2
        )

        self.principals = Principals.objects.create(
            tconst=self.title_basic,
            nconst=self.names,
            ordering=1,
            category="Director",
            job="Directing",
            characters="Main Character",
            img_url_asset="https://example.com/image.jpg"
        )

        self.rating = Rating.objects.create(
            tconst=self.title_basic,
            averageRating=8.5,
            numVotes=100
        )

    def test_title_object_creation(self):
        # Test that the title object is created correctly
        self.assertEqual(self.title_basic.tconst, "tt1234567")
        self.assertEqual(self.title_basic.titleType, "movie")
        
        self.assertEqual(self.title_basic.primaryTitle,"Test Primary Title")
        self.assertEqual(self.title_basic.originalTitle, "Test Original Title")


        self.assertEqual(self.title_basic.isAdult,0)
        self.assertEqual(self.title_basic.startYear,2020)
        self.assertEqual(self.title_basic.endYear,2021)
        self.assertEqual(self.title_basic.runtimeMinutes,120) 
        self.assertEqual(self.title_basic.genres,"Comedy,Drama")
        self.assertEqual(self.title_basic.img_url_asset,"https://example.com/image.jpg")
        
        
        # Add more assertions for other fields

    def test_title_aka_creation(self):
        # Test that the TitleAka object is created correctly
        self.assertEqual(self.title_aka.ordering, 1)
        self.assertEqual(self.title_aka.title, "Alternate Title")
        self.assertEqual(self.title_aka.region, "US")
        self.assertEqual(self.title_aka.language,"en")
        self.assertEqual(self.title_aka.types,"Main")
        self.assertEqual(self.title_aka.attributes,"")
        self.assertEqual(self.title_aka.isOriginalTitle,0) 

    def test_names_creation(self):
        # Test that the Names object is created correctly
        
        self.assertEqual(self.names.nconst, "nm1234567")
        self.assertEqual(self.names.primaryName, "John Doe")
        self.assertEqual(self.names.birthYear, 1980)
        self.assertEqual(self.names.deathYear, 2020)
        self.assertEqual(self.names.primaryProfession,"Actor")
        self.assertEqual(self.names.knownForTitles,"tt1234567,tt1234568")
        self.assertEqual(self.names.imgUrl,"https://example.com/image.jpg")

    def test_crew_creation(self):
        # Test that the Crew object is created correctly
        self.assertEqual(self.crew.tconst.tconst, "tt1234567")
        self.assertEqual(self.crew.directors, "John Doe")
        self.assertEqual(self.crew.writers, "Jane Smith")    

    def test_episode_creation(self):
        # Test that the Episode object is created correctly
        self.assertEqual(self.episode.tconst.tconst, "tt1234567")
        self.assertEqual(self.episode.parentTconst, "tt1234568")
        self.assertEqual(self.episode.seasonNumber, 1)
        self.assertEqual(self.episode.episodeNumber, 2)

    def test_principals_creation(self):
        self.assertEqual(self.principals.tconst.tconst, "tt1234567")
        self.assertEqual(self.principals.nconst.nconst, "nm1234567")
        self.assertEqual(self.principals.ordering, 1)
        self.assertEqual(self.principals.category, "Director")
        self.assertEqual(self.principals.job, "Directing")
        self.assertEqual(self.principals.characters, "Main Character")
        self.assertEqual(self.principals.img_url_asset,"https://example.com/image.jpg")


    def test_rating_creation(self):
        # Test that the Rating object is created correctly
        self.assertEqual(self.rating.tconst.tconst, "tt1234567")
        self.assertEqual(self.rating.averageRating, 8.5)
        self.assertEqual(self.rating.numVotes, 100)
    # You can add more tests to cover different aspects of your model, such as custom methods, model validation, etc.
