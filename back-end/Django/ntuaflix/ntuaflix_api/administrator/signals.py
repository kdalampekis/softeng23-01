# Create a Python file (e.g., signals.py) in your app's directory if not already present.
# Import necessary modules at the top of the file.
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Group

# Define a signal handler function.
@receiver(post_migrate)
def create_custom_permissions(sender, **kwargs):
    # Check if the signal is sent for your specific app.
    if sender.name == 'administrator':  # Replace 'your_app_name' with your app's name.
        # Create the custom permission.
        change_user_permission, created = Permission.objects.get_or_create(
            codename='change_user',
            name='Can change user attributes',
            content_type=ContentType.objects.get_for_model(User),
        )

        # Get the superuser group.
        superuser_group, created = Group.objects.get_or_create(name='Superuser')

        # Assign the permission to the superuser group if it doesn't already have it.
        if not superuser_group.permissions.filter(codename='change_user').exists():
            superuser_group.permissions.add(change_user_permission)
