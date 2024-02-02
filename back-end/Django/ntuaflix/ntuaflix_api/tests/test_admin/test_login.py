from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

class LoginApiViewTest(APITestCase):
    def setUp(self):
        # Create a user for testing login
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        # URL for the LoginApiView
        self.url = reverse('login')  # Replace 'login' with the actual name of your LoginApiView URL

    def test_login_success(self):
        """
        Ensure we can successfully login with valid credentials.
        """
        data = {'username': 'testuser', 'password': 'testpass123'}
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)
        self.assertEqual(response.data['is_superuser'], self.user.is_superuser)
        # Verify that a token has been created
        self.assertTrue(Token.objects.filter(user=self.user).exists())

    def test_login_invalid_credentials(self):
        """
        Ensure login fails with invalid credentials.
        """
        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('error' in response.data)
        self.assertEqual(response.data['error'], 'Invalid credentials')
