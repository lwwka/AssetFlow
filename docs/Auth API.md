# Auth API

## Base URL

Local backend:

`http://localhost:8080`

## Endpoints

### `POST /api/auth/register`

Request body:

```json
{
  "email": "demo@example.com",
  "password": "password123",
  "fullName": "Demo User"
}
```

Response:

```json
{
  "userId": 1,
  "email": "demo@example.com",
  "fullName": "Demo User",
  "token": "uuid-token"
}
```

### `POST /api/auth/login`

Request body:

```json
{
  "email": "demo@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "userId": 1,
  "email": "demo@example.com",
  "fullName": "Demo User",
  "token": "uuid-token"
}
```

### `GET /api/auth/me`

Header:

```http
Authorization: Bearer <token>
```

Response:

```json
{
  "userId": 1,
  "email": "demo@example.com",
  "fullName": "Demo User"
}
```

## Current Auth Notes

- auth token storage is currently in-memory on backend
- suitable for local dev
- mobile Profile now calls `GET /api/auth/me` when a live auth token is available
- mobile falls back to local session data when backend auth is unavailable
- should later be replaced with proper JWT or session strategy
