# Lightweight slim Python base image
FROM python:3.12-slim

# Copy the uv binary tool directly from its official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

COPY . .

# Sync dependencies (production only, no dev/test tools)
RUN uv sync --no-dev

CMD ["uv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
