# GameKey Store

Angular 22 LTS learning project built across a 10-day curriculum:

1. Workspace scaffolding + Tailwind CSS
2. Standalone components, bindings, control flow (@if/@for)
3. Services & Dependency Injection (RxJS Observables)
4. Router & dynamic routes (game details page)
5. Reactive Forms & custom validators
6. HttpClient + Django REST API integration
7. Token authentication, HTTP interceptors, route guards
8. State management with Signals (shopping cart)
9. Custom pipes + parent/child component communication (@Input/@Output)
10. Unit testing (Jasmine/Karma) + production build & deployment

## Run locally

```bash
pnpm install
ng serve
```

Visit http://localhost:4200/

## Backend

Expects a Django REST API at `http://127.0.0.1:8000/api/games/` (see Day 6/7).
Update `src/app/services/game.service.ts` `apiUrl` if your backend differs.

## Build

```bash
ng build
```

## Test

```bash
ng test
```
