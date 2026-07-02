# GameKey Platform — Backend (Django + DRF + Celery)

Django REST API built across a 10-day curriculum: models, DRF viewsets, token
auth, transactional order purchasing, background expiry detection, signed
webhooks, async Celery delivery with retries, tests, and Docker deployment.

## Local setup

```bash
uv venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
uv sync

cp .env.example .env              # then fill in SECRET_KEY etc.

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

API root: http://127.0.0.1:8000/api/
Admin: http://127.0.0.1:8000/admin/

CORS is pre-configured to allow requests from the Angular dev server at
`http://localhost:4200`.

## Background jobs (Celery + Redis)

```bash
docker run -d -p 6379:6379 redis:7-alpine

# terminal 1
celery -A gamekey_platform worker --loglevel=info

# terminal 2
python manage.py check_expired_keys
```

## Tests

```bash
uv add --dev pytest pytest-django pytest-mock pytest-cov   # if not already synced
pytest --cov=games --cov-report=term-missing
```

## Docker Compose (web + worker + redis)

```bash
docker compose up --build
```

## Deploying

See the curriculum's Day 10 notes for deploying to Render (Web Service +
Background Worker + Redis instance), using Gunicorn as the production WSGI
server and PostgreSQL instead of SQLite.
