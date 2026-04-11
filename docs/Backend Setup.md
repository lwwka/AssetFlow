# Backend Setup

## Folder

Backend project path:

`C:\codex-sandbox\AssetFlow\backend`

## Start Commands

### Local Dev Without PostgreSQL

Use the in-memory dev profile:

```powershell
cd C:\codex-sandbox\AssetFlow\backend
mvn spring-boot:run "-Dspring-boot.run.profiles=dev"
```

### Local PostgreSQL Mode

Use the default profile:

```powershell
cd C:\codex-sandbox\AssetFlow\backend
mvn spring-boot:run
```

## Default Port

Backend runs on:

`http://localhost:8080`

## If Port 8080 Is Busy

Check the process:

```powershell
netstat -ano | findstr :8080
Get-Process -Id <PID>
```

Stop it if safe:

```powershell
Stop-Process -Id <PID>
```

Or run backend on another port:

```powershell
mvn spring-boot:run "-Dspring-boot.run.arguments=--server.port=8081"
```

## PostgreSQL Notes

Expected default config in production-like local mode:

- database: `assetflow`
- username: `assetflow`
- password: `assetflow`

## Local Dev Notes

- `dev` profile uses H2 in-memory database
- `dev` profile avoids PostgreSQL setup friction
- current local auth is suitable for development only
