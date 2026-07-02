# GameKey Store — Full Stack

Angular frontend + Django REST backend, from the combined 10-day frontend
curriculum and 10-day backend curriculum.

```
gamekey-fullstack/
├── frontend/     Angular 22 SPA (catalog, cart, auth, reactive forms...)
├── backend/      Django + DRF + Celery API (models, orders, webhooks...)
└── docker-compose.yml   Runs the whole stack together
```

## Quick start — run everything with Docker

```bash
cd gamekey-fullstack
cp backend/.env.example backend/.env    # fill in SECRET_KEY etc.
docker compose up --build
```

- Frontend: http://localhost:4200/
- Backend API: http://localhost:8000/api/
- Django Admin: http://localhost:8000/admin/

The frontend is built and served as static files via Nginx; the backend runs
Django's dev server plus a Celery worker; Redis is the message broker.

## Quick start — run locally without Docker

**Backend:**
```bash
cd backend
uv venv && source .venv/bin/activate
uv sync
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Frontend** (in a second terminal):
```bash
cd frontend
pnpm install
ng serve
```

Visit http://localhost:4200/ — CORS is already configured on the backend to
accept requests from `http://localhost:4200`.

## How they connect

- `frontend/src/app/services/game.service.ts` calls
  `http://127.0.0.1:8000/api/games/` for the catalog and to add games.
- `frontend/src/app/interceptors/auth.interceptor.ts` attaches
  `Authorization: Token <token>` to outbound requests once you log in
  (`localStorage.setItem('authToken', '<token from /api/register/>')`).
- `frontend/src/app/guards/auth.guard.ts` blocks `/games/add` until a token
  is present.
- Backend `POST /api/register/` returns a token; `POST /api/orders/`
  purchases a key (separate from the frontend's simple catalog demo, but
  available for further integration).

## Known scope notes

- The frontend's "Toggle Availability" button updates state locally only —
  the backend `Game` model (per the curriculum) doesn't include an
  `available` field. Wire this up by adding the field + a PATCH call if you
  want it persisted.
- The backend uses SQLite for local dev; switch to PostgreSQL for
  production deployments (see `backend/README.md`).
- Background webhook delivery (Celery + Redis) requires the `redis` and
  `worker` services to be running — both are included in
  `docker-compose.yml`.
