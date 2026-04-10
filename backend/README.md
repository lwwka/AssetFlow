# AssetFlow Backend

Spring Boot backend skeleton for AssetFlow.

## Stack

- Spring Boot
- Spring Data JPA
- PostgreSQL
- Flyway

## Run

Open PowerShell in `backend/`.

If you want to start the Java server with your PostgreSQL setup:

```powershell
mvn spring-boot:run
```

If you want the easiest local startup without PostgreSQL, use the in-memory `dev` profile:

```powershell
mvn spring-boot:run "-Dspring-boot.run.profiles=dev"
```

The backend will start on:

```text
http://localhost:8080
```

If port `8080` is already in use on Windows, check it with:

```powershell
netstat -ano | findstr :8080
```

Then inspect the process:

```powershell
Get-Process -Id <PID>
```

If it is safe to stop it:

```powershell
Stop-Process -Id <PID>
```

If you prefer to run the backend on another port instead, use:

```powershell
mvn spring-boot:run "-Dspring-boot.run.arguments=--server.port=8081"
```

## Initial APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/portfolios`
- `GET /api/portfolios/user/{userId}`

## Notes

- Maven Wrapper is not added yet, so this skeleton currently assumes `mvn` is available locally.
- Password handling is placeholder-only right now and must be replaced with real hashing plus JWT/session auth before production use.
- Kafka, Kubernetes, market data ingestion, and holdings/transactions endpoints can be added on top of this base.
