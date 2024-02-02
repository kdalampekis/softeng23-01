from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class UserSignUpTest(APITestCase):
    def setUp(self):
        self.create_url = reverse('signup')  # Replace 'signup' with the actual name of your URL pattern for SignUpAPIView

    def test_create_user_successfully(self):
        """
        Ensure we can create a new user with a valid request.
        """
        data = {
            'username': 'testuser',
            'password': 'testpassword123',
            'email': 'test@example.com',
            'firstname': 'Test',
            'lastname': 'User',
        }

        response = self.client.post(self.create_url, data, format='json')
        user = User.objects.last()  # Get the last registered user to verify its data
        
        # Check that the response status code is 201 (Created)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Check the response contains the correct message
        self.assertEqual(response.data, {"detail": "User created successfully. Activation required."})
        # Ensure the user was created with the correct attributes
        self.assertEqual(user.username, data['username'])
        self.assertEqual(user.email, data['email'])
        self.assertEqual(user.first_name, data['firstname'])
        self.assertEqual(user.last_name, data['lastname'])
        # Ensure the user is not active and not a superuser
        self.assertFalse(user.is_active)
        self.assertFalse(user.is_superuser)

