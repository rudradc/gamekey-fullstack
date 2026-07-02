import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gamekey_platform.settings')
django.setup()

from django.contrib.auth.models import User
from games.models import Publisher

# Create Superuser if it doesn't exist
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')
    print("Superuser 'admin' created.")

# Create Default Publisher with ID 1 so the frontend works
if not Publisher.objects.filter(id=1).exists():
    Publisher.objects.create(id=1, name='Default Publisher', website='https://example.com')
    print("Default Publisher created.")
