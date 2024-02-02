from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.response import Response

class LogoutApiViewTest(APITestCase):
    def setUp(self):
        # Create a user and token for testing successful logout
        self.user = User.objects.create_user(username='testuser', password='testpassword123')
        self.token = Token.objects.create(user=self.user)
        # Define the URL for the LogoutApiView
        self.url = reverse('logout')  # Make sure this name matches the URL name in your urls.py

    def test_logout_success(self):
        """
        Ensure we can successfully logout a user and delete their token.
        """
        self.client.credentials(HTTP_AUTHORIZATION=self.token.key)
        response = self.client.post(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"detail": "Successfully logged out and deleted auth token."})
        self.assertFalse(Token.objects.filter(key=self.token.key).exists())

    def test_logout_invalid_token(self):
        """
        Ensure that logging out with an invalid token returns a user not found error.
        """
        self.client.credentials(HTTP_AUTHORIZATION='somerandomtoken')
        response = self.client.post(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"detail": "User not found."})

    def test_logout_no_token(self):
        """
        Ensure that logging out without providing a token returns an invalid token format error.
        """
        # Do not set any credentials
        response = self.client.post(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"detail": "Invalid token format."})
