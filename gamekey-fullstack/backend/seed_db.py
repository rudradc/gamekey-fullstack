import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gamekey_platform.settings')
django.setup()

from django.contrib.auth.models import User
from games.models import Publisher

# Create Superuser if it doesn't exist
admin_user, created = User.objects.get_or_create(
    username='admin',
    defaults={'email': 'admin@example.com'}
)
if created:
    admin_user.set_password('admin')
    admin_user.save()
    print("Superuser 'admin' created.")

# Create Default Publisher with ID 1 so the frontend works
if not Publisher.objects.filter(id=1).exists():
    Publisher.objects.create(
        id=1, 
        name='Default Publisher', 
        webhook_url='https://example.com/webhook',
        webhook_secret='default_secret_key',
        user=admin_user
    )
    print("Default Publisher created.")
