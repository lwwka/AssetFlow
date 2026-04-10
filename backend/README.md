# AssetFlow Backend

Spring Boot backend skeleton for AssetFlow.

## Stack

- Spring Boot
- Spring Data JPA
- PostgreSQL
- Flyway

## Run

Create a PostgreSQL database named `assetflow`, then run:

```bash
mvn spring-boot:run
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
