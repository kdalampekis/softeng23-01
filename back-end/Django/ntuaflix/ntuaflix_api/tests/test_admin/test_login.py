from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User

class AuthAPITestCase(APITestCase):
    def test_sign_up(self):
        url = reverse('signup')  # Replace with your sign-up URL name
        data = {
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'newuser@example.com',
            'firstname': 'New',
            'lastname': 'User'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_logout(self):
        # First, create and log in a user
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

        url = reverse('logout')  # Replace with your logout URL name
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Further assertions can be added to ensure the token is invalidated
