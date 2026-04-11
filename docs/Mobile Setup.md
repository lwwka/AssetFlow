# Mobile Setup

## Folder

Mobile project path:

`C:\codex-sandbox\AssetFlow\mobile`

## Start Commands

Install packages:

```powershell
cd C:\codex-sandbox\AssetFlow\mobile
npm install
```

Start Expo:

```powershell
npx expo start
```

Fastest local UI workflow:

```powershell
npx expo start --web
```

## Backend Dependency

The mobile app expects the backend auth API to run on port `8080`.

- iOS simulator: `http://localhost:8080`
- Android emulator: `http://10.0.2.2:8080`
- physical device: use your machine LAN IP instead of localhost

## Current Mobile State

- login screen
- register screen
- local tab flow
- dashboard screen
- portfolio screen
- watchlist screen
- profile screen

## Recommended Local Flow

1. Start backend first
2. Start Expo
3. Test login and register
4. Continue UI iteration
