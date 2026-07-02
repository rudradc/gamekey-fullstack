import os
from celery import Celery

# Set default settings module for the 'celery' program
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gamekey_platform.settings')

app = Celery('gamekey_platform')
# Reads configuration from settings.py, using keys prefixed with CELERY_
app.config_from_object('django.conf:settings', namespace='CELERY')
# Auto-discover tasks.py inside each installed app
app.autodiscover_tasks()
