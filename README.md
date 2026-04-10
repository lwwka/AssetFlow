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
- backend auth API integration for login and register

Run the mobile app from `mobile/`:

```bash
npm install
npx expo start
```

For the fastest local UI development workflow, run the mobile app on web:

```bash
npx expo start --web
```

The mobile app now expects the Spring Boot backend to be running on port `8080`.

- iOS simulator uses `http://localhost:8080`
- Android emulator uses `http://10.0.2.2:8080`
- Physical device testing requires changing the API base URL in [authApi.ts](/Users/lawrence/Desktop/codex-workspace/AssetFlow/mobile/src/api/authApi.ts) to your machine's LAN IP

## Next Steps

- build Spring Boot auth APIs
- connect mobile auth to backend
- add holdings, transactions, and market data services

## Frontend Data Strategy

The current mobile app uses a hybrid approach:

- auth prefers the Spring Boot backend when available
- auth falls back to offline demo mode if the backend is not running
- dashboard, portfolio, watchlist, and profile currently use a shared service layer backed by mock portfolio data
- screen components now read portfolio data through a shared `usePortfolioData` hook
- the hook already exposes `isLoading`, `error`, and `reload` so screens can keep the same contract when live APIs are added

Recommended migration order from mock data to real APIs:

1. Keep UI development fast with shared mock data during MVP iteration
2. Replace auth fallback with real token-based authentication
3. Move portfolio summary into `/api/portfolios`
4. Move holdings into `/api/holdings`
5. Move transactions into `/api/transactions`
6. Move watchlist and quote data into market data services

The portfolio service currently supports a simple data mode switch:

- `mock`: current default for local UI development
- `live`: reserved for future Spring Boot API integration

When `live` mode is enabled, the hook first tries `GET /api/portfolios/user/{userId}` and falls back to mock data if the backend is unavailable.

## Product Roadmap

### Product Vision

AssetFlow helps everyday investors track their portfolios in one mobile-first app, understand performance clearly, and make more confident decisions without the complexity of institutional tools.

### Target Users

- Retail investors managing stocks, ETFs, and cash positions
- Busy professionals who want quick portfolio visibility on mobile
- Users who currently track investments in spreadsheets or broker apps

### Success Metrics

- Weekly active users
- 7-day and 30-day retention
- Portfolio creation completion rate
- Daily check-in frequency
- Watchlist engagement
- Data sync success rate

### Phase 1: Foundation MVP

Goal: ship a usable first version that supports account access, portfolio setup, and a basic daily tracking experience.

Key initiatives:

- User authentication with Spring Boot backend
- Replace mock auth with real login and register APIs
- Portfolio creation and manual holdings entry
- Holdings list with position value, cost basis, and gain/loss
- Dashboard summary for total portfolio value and daily change
- Basic watchlist for saving symbols users want to monitor
- Secure token handling and session persistence

Expected outcome:

Users can sign up, log in, add their investments manually, and monitor a simple portfolio from mobile.

### Phase 2: Core Tracking Experience

Goal: make AssetFlow useful as a daily portfolio companion instead of only a static record-keeping app.

Key initiatives:

- Transaction history for buys, sells, dividends, and cash movements
- Portfolio performance views across day, week, month, and all-time
- Asset allocation breakdown by asset type, sector, or geography
- Watchlist price movement and simple market overview
- Better dashboard insights such as top gainers, top losers, and concentration risk
- Edit and delete flows for holdings and transactions
- Improved error states, loading states, and empty states across the app

Expected outcome:

Users can understand what changed in their portfolio, why it changed, and where their exposure sits.

### Phase 3: Automation and Data Integrations

Goal: reduce manual input and increase the trustworthiness of portfolio data.

Key initiatives:

- Market data integration for real-time or delayed pricing
- Historical price storage for performance charts
- Broker import via CSV as the first lightweight ingestion path
- Dividend and corporate action handling
- FX support for multi-currency portfolios
- Background sync jobs in Spring Boot
- Portfolio reconciliation checks and data quality alerts

Expected outcome:

Users spend less time maintaining data manually and get a more accurate, continuously updated portfolio view.

### Phase 4: Intelligence and Personalization

Goal: evolve from tracking to decision support.

Key initiatives:

- Personalized portfolio insights and alerts
- Price alerts and watchlist event notifications
- Goal tracking for wealth targets or income targets
- Risk indicators such as sector concentration and single-asset exposure
- Smart summaries of portfolio changes over time
- Custom dashboard cards and personalization settings

Expected outcome:

AssetFlow becomes a habit-forming product that helps users notice important signals and stay engaged.

### Phase 5: Premium and Ecosystem Expansion

Goal: create differentiation and long-term product value.

Key initiatives:

- Premium analytics and advanced reporting
- Tax lot tracking and realized/unrealized gain reports
- Shared or advisor view for family portfolios
- Web companion dashboard for deeper analysis
- Benchmark comparison against indices and custom portfolios
- Exportable reports and monthly summaries

Expected outcome:

AssetFlow expands from a simple tracker into a broader investment operating system for serious retail users.

### Suggested Delivery Timeline

- Q1: Phase 1 Foundation MVP
- Q2: Phase 2 Core Tracking Experience
- Q3: Phase 3 Automation and Data Integrations
- Q4: Phase 4 Intelligence and Personalization
- Later: Phase 5 Premium and Ecosystem Expansion

### Near-Term Build Priorities

If the team is small, the highest-priority sequence should be:

1. Backend auth and real mobile authentication
2. Manual holdings and transaction model
3. Dashboard metrics and portfolio summary APIs
4. Watchlist backed by persistent storage
5. Market data integration
