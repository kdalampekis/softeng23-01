from django.test import SimpleTestCase
from django.urls import resolve, reverse
from ..views import *

class TestUrls(SimpleTestCase):
    
    # /////////////////////// UPLOAD URL TESTS ////////////////////////////
    
    def test_upload_titlebasics_url_resolves(self):
        url = reverse('upload_title_basics')
        self.assertEquals(resolve(url).func, UploadTitleBasics)
    
    def test_upload_titleakas_url_resolves(self):
        url = reverse('upload_title_akas')
        self.assertEquals(resolve(url).func, UploadTitleAkas)
    
    def test_upload_namebasics_url_resolves(self):
        url = reverse('upload_name_basics')
        self.assertEquals(resolve(url).func, UploadNameBasics)
    
    def test_upload_titlecrew_url_resolves(self):
        url = reverse('upload_title_crew')
        self.assertEquals(resolve(url).func, UploadTitleCrew)
    
    def test_upload_titleepisode_url_resolves(self):
        url = reverse('upload_title_episode')
        self.assertEquals(resolve(url).func, UploadTitleEpisode)
    
    def test_upload_titleprincipals_url_resolves(self):
        url = reverse('upload_title_principals')
        self.assertEquals(resolve(url).func, UploadTitlePrincipals)
    
    def test_upload_titleratings_url_resolves(self):
        url = reverse('upload_title_ratings')
        self.assertEquals(resolve(url).func, UploadTitleRatings)

# /////////////////////// OTHER URL TESTS ////////////////////////////
    
    def test_healthcheck_url_resolves(self):
        url = reverse('health_check')
        self.assertEquals(resolve(url).func, health_check)
    
    def test_add_user_url_resolves(self):
        url = reverse('add_user', args=['some_username', 'some_password'])
        self.assertEquals(resolve(url).func, add_user)
    
    def test_user_info_url_resolves(self):
        url = reverse('user_info', args=['some_username'])
        self.assertEquals(resolve(url).func.view_class, UserInfoAPIView)
    
    def test_reset_all_url_resolves(self):
        url = reverse('reset_all')
        self.assertEquals(resolve(url).func, reset_all)