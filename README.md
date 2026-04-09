# AssetFlow

AssetFlow is a mobile-first investment portfolio tracker built with React Native and Spring Boot.

## Current Scope

- React Native app scaffold with Expo
- Login and register flow with local mock auth
- Dashboard, portfolio, watchlist, and profile screens
- Project structure prepared for Spring Boot backend

## Project Structure

```text
AssetFlow/
  mobile/
  backend/
```

## Mobile

The mobile app currently includes:

- auth screens
- local tab-based app flow
- portfolio dashboard UI
- mock auth API for future backend integration

Run the mobile app from `mobile/`:

```bash
npm install
npx expo start
```

## Next Steps

- build Spring Boot auth APIs
- connect mobile auth to backend
- add holdings, transactions, and market data services
