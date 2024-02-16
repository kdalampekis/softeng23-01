from django.test import TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from ..models import *
from ..serializers import *


class ViewTests(TestCase):
    def setUp(self):
        # Create a superuser for authentication
        self.superuser = User.objects.create_superuser(
            username='admin',
            password='admin123',
            email='admin@example.com'
        )
        
        # Create an authentication token for the superuser
        self.token = Token.objects.create(user=self.superuser)

        # Create a user to insert him to the database
        self.user = User.objects.create_user(
            username = 'some_username',
            email = 'some_email@example.com',
            first_name = 'some_first_name',
            last_name = 'some_last_name',
            is_active = False,
            is_superuser = False,
        )
        
        self.title_basics_tsv_content = """tconst	titleType	primaryTitle	originalTitle	isAdult	startYear	endYear	runtimeMinutes	genres	img_url_asset
tt0000929	short	Klebolin klebt alles	Klebolin klebt alles	0	1990	\\N	\\N	Comedy,Short	\\N"""
        self.title_akas_tsv_content = """titleId	ordering	title	region	language	types	attributes	isOriginalTitle
tt0000929	1	Willys Streiche: Klebolin klebt alles	DE	\\N	alternative	\\N	0"""
        self.name_basics_tsv_content = """nconst	primaryName	birthYear	deathYear	primaryProfession	knownForTitles	img_url_asset
nm0000019	Federico Fellini	1920	1993	writer,director,actor	tt0071129,tt0047528,tt0050783,tt0056801	https://image.tmdb.org/t/p/{width_variable}/jH2VnHAuI0UbTWsnrjMPro0fC9j.jpg"""
        self.title_crew_tsv_content = """tconst	directors	writers
tt0000929	nm0093361	\\N"""
        self.title_episode_tsv_content = """tconst	parentTconst	seasonNumber	episodeNumber
tt0000929	tt0298685	1	4"""
        self.title_principals_tsv_content = """tconst	ordering	nconst	category	job	characters	img_url_asset
tt0000929	1	nm0000019	actor	\\N	\\N	\\N"""
        self.title_ratings_tsv_content = """tconst	averageRating	numVotes
tt0000929	5.3	46"""


    def test_upload_title_basics_view(self):
        tsv_content = self.title_basics_tsv_content
        tsv_file = SimpleUploadedFile("test_title_basics.tsv", tsv_content.encode('utf-8'))
        response = self.client.post(reverse('upload_title_basics'), {'tsv_file': tsv_file}, HTTP_AUTHORIZATION=self.token.key)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')
        self.assertEqual(response.json()['processed_rows'], 1)


    def test_upload_title_akas_view(self):
        TitleBasic.objects.create(tconst='tt0000929')
        tsv_content = self.title_akas_tsv_content
        tsv_file = SimpleUploadedFile("test_title_akas.tsv", tsv_content.encode('utf-8'))
        response = self.client.post(reverse('upload_title_akas'), {'tsv_file': tsv_file}, HTTP_AUTHORIZATION=self.token.key)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')
        self.assertEqual(response.json()['processed_rows'], 1)


    def test_upload_name_basics_view(self):
        tsv_content = self.name_basics_tsv_content
        tsv_file = SimpleUploadedFile("test_name_basics.tsv", tsv_content.encode('utf-8'))
        response = self.client.post(reverse('upload_name_basics'), {'tsv_file': tsv_file}, HTTP_AUTHORIZATION=self.token.key)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')
        self.assertEqual(response.json()['processed_rows'], 1)


    def test_upload_title_crew_view(self):
        TitleBasic.objects.create(tconst='tt0000929')
        tsv_content = self.title_crew_tsv_content
        tsv_file = SimpleUploadedFile("test_title_crew.tsv", tsv_content.encode('utf-8'))
        response = self.client.post(reverse('upload_title_crew'), {'tsv_file': tsv_file}, HTTP_AUTHORIZATION=self.token.key)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')
        self.assertEqual(response.json()['processed_rows'], 1)


    def test_upload_title_episode_view(self):
        TitleBasic.objects.create(tconst='tt0000929')
        tsv_content = self.title_episode_tsv_content
        tsv_file = SimpleUploadedFile("test_title_episode.tsv", tsv_content.encode('utf-8'))
        response = self.client.post(reverse('upload_title_episode'), {'tsv_file': tsv_file}, HTTP_AUTHORIZATION=self.token.key)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')
        self.assertEqual(response.json()['processed_rows'], 1)


    def test_upload_title_principals_view(self):
        TitleBasic.objects.create(tconst='tt0000929')
        Names.objects.create(nconst='nm0000019')
        tsv_content = self.title_principals_tsv_content
        tsv_file = SimpleUploadedFile("test_title_principals.tsv", tsv_content.encode('utf-8'))
        response = self.client.post(reverse('upload_title_principals'), {'tsv_file': tsv_file}, HTTP_AUTHORIZATION=self.token.key)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')
        self.assertEqual(response.json()['processed_rows'], 1)


    def test_upload_title_ratings_view(self):
        TitleBasic.objects.create(tconst='tt0000929')
        tsv_content = self.title_ratings_tsv_content
        tsv_file = SimpleUploadedFile("test_title_ratings.tsv", tsv_content.encode('utf-8'))
        response = self.client.post(reverse('upload_title_ratings'), {'tsv_file': tsv_file}, HTTP_AUTHORIZATION=self.token.key)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')
        self.assertEqual(response.json()['processed_rows'], 1)


    def test_health_check_success(self):
        response = self.client.post(reverse('health_check'), HTTP_AUTHORIZATION=self.token.key)
        
        # Check if the response is successful and contains the expected data
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'OK')
        self.assertEqual(response.json()['dataconnection'], 'Database connection successful')


    def test_health_check_failed_authentication(self):
        response = self.client.post(reverse('health_check'))

        # Check if the response indicates permission denied
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'failed')
        self.assertEqual(response.json()['dataconnection'], "Permission denied. You don't have superuser privileges.")


    def test_reset_all(self):
        response = self.client.post(reverse('reset_all'), HTTP_AUTHORIZATION=self.token.key)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'OK')


    def test_user_info_success(self):        
        response = self.client.get(reverse('user_info', kwargs={'username': self.user.username}) , HTTP_AUTHORIZATION=self.token.key)
        
        self.assertEqual(response.status_code, 200)
        expected_data = UserSerializer(self.user).data
        self.assertEqual(response.data, expected_data)


    def test_user_info_not_found(self):
        response = self.client.get(reverse('user_info', kwargs={'username': 'invalidusername'}), HTTP_AUTHORIZATION=self.token.key)

        # Check if the response indicates user not found
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data, {"error": "User not found"})


    def test_add_user_inactive(self):        
        response = self.client.post(reverse('add_user', kwargs={'username': self.user.username, 'password': self.user.password}), HTTP_AUTHORIZATION=self.token.key)
        
        # Check if the response indicates successful activation
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "User activated successfully."})

        # Check if the user is active and the password is updated
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_active)
    
    
    def test_add_user_active(self):
        self.user.is_active = True
        self.user.save()
        
        response = self.client.post(reverse('add_user', kwargs={'username': self.user.username, 'password': self.user.password}), HTTP_AUTHORIZATION=self.token.key)
        
        # Check if the response indicates user is already active
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"detail": "User is already active."})


    def test_add_user_not_found(self):
        response = self.client.post(reverse('add_user', kwargs={'username': 'fake_username', 'password': 'fake_password'}), HTTP_AUTHORIZATION=self.token.key)
        
        # Check if the response indicates user is already active
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {"detail": "User not found."})