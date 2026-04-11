# AssetFlow

**中文**

AssetFlow 是一個以手機為核心的投資組合追蹤產品，目標是幫助使用者清楚掌握持倉、投資組合表現、自選清單與盈虧變化。

**English**

AssetFlow is a mobile-first investment portfolio tracking product designed to help users clearly understand their holdings, portfolio performance, watchlists, and profit-and-loss changes.

## Product Overview / 產品概覽

**中文**

AssetFlow 的核心價值不是交易，而是投資資產管理與追蹤。現階段重點在於建立清楚、易用、可持續查看的投資總覽體驗。

**English**

AssetFlow is not primarily a trading product. Its core value is investment asset management and tracking, with an emphasis on delivering a clear, simple, and repeatable portfolio overview experience.

## Tech Stack / 技術架構

- Mobile app: React Native + Expo
- Mobile language: TypeScript
- Backend: Spring Boot
- Backend language: Java 17
- ORM: Spring Data JPA with Hibernate
- Database: PostgreSQL
- Local development database: H2 in-memory
- Database migration: Flyway
- Backend build tool: Maven
- Mobile package manager: npm

## Project Structure / 專案結構

```text
AssetFlow/
  mobile/    React Native + Expo app
  backend/   Spring Boot API service
  docs/      Product and engineering notes
```

## Current Status / 目前狀態

**中文**

目前專案已具備：

- Login / Register 畫面
- Dashboard / Portfolio / Watchlist / Profile 畫面
- 基本 auth API
- Profile 已可透過 `/api/auth/me` 讀取目前使用者資料
- Portfolio 已可透過 `/api/portfolios/user/{userId}` 讀取真實 portfolio 清單
- Dashboard 已可透過 `/api/portfolios/{portfolioId}/summary` 讀取真實 summary
- Portfolio 已可透過 `/api/portfolios/{portfolioId}/holdings` 讀取真實 holdings
- Dashboard / Portfolio 已可透過 `/api/portfolios/{portfolioId}/transactions` 讀取真實 transactions
- Portfolio 建立與依使用者查詢 API
- PostgreSQL 與 H2 開發模式

目前的主要缺口：

- Dashboard 與 Portfolio 仍以 mock data 為主
- 前端尚未完全接上真實登入後的資料流程
- holdings / transactions / summary 尚未形成完整真實資料閉環
- auth 機制仍偏本地開發用途

**English**

The project already includes:

- Login and Register screens
- Dashboard, Portfolio, Watchlist, and Profile screens
- Basic authentication APIs
- Profile can now load the current user through `/api/auth/me`
- Portfolio can now load live portfolio records through `/api/portfolios/user/{userId}`
- Dashboard can now load a live summary through `/api/portfolios/{portfolioId}/summary`
- Portfolio can now load live holdings through `/api/portfolios/{portfolioId}/holdings`
- Dashboard / Portfolio can now load live transactions through `/api/portfolios/{portfolioId}/transactions`
- Portfolio creation and user portfolio lookup APIs
- PostgreSQL and H2 development modes

The current main gaps are:

- Dashboard and Portfolio still rely mostly on mock data
- The frontend is not yet fully connected to authenticated live user flows
- holdings / transactions / summary are not yet part of a complete live data loop
- the auth approach is still development-oriented

## Local Setup / 本地啟動

### Mobile

```bash
cd mobile
npm install
npx expo start
```

Fastest local UI workflow:

```bash
npx expo start --web
```

### Backend

Use the easiest local mode without PostgreSQL:

```powershell
cd backend
mvn spring-boot:run "-Dspring-boot.run.profiles=dev"
```

Use the default PostgreSQL-backed mode:

```powershell
cd backend
mvn spring-boot:run
```

Default backend URL:

```text
http://localhost:8080
```

If `8080` is busy:

```powershell
mvn spring-boot:run "-Dspring-boot.run.arguments=--server.port=8081"
```

## Mobile and Backend Integration / 行動端與後端整合

**中文**

目前 mobile app 預期 backend 運行在 `8080`：

- iOS simulator: `http://localhost:8080`
- Android emulator: `http://10.0.2.2:8080`
- 實機測試：需改為開發機 LAN IP

目前採混合資料策略：

- auth 優先走 backend API
- backend 不可用時，auth 可退回 offline demo flow
- dashboard / portfolio / watchlist / profile 仍以共享 mock data 為主

**English**

The mobile app currently expects the backend to run on port `8080`:

- iOS simulator: `http://localhost:8080`
- Android emulator: `http://10.0.2.2:8080`
- Physical device testing: use your machine's LAN IP

The current data strategy is hybrid:

- auth prefers the backend API
- auth can fall back to an offline demo flow when the backend is unavailable
- dashboard / portfolio / watchlist / profile still rely mainly on shared mock data

## API Snapshot / 目前 API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/portfolios`
- `GET /api/portfolios/user/{userId}`
- `GET /api/portfolios/{portfolioId}/summary`
- `GET /api/portfolios/{portfolioId}/holdings`
- `GET /api/portfolios/{portfolioId}/transactions`

## MVP Focus / MVP 重點

**中文**

現階段最重要的不是增加更多功能，而是完成第一條真實資料閉環：

1. 使用者註冊或登入
2. 取得目前使用者資訊
3. 建立或讀取 portfolio
4. 顯示 holdings 與 portfolio summary
5. 讓 dashboard 顯示真實資料而非 mock data

**English**

The highest priority right now is not adding more features, but completing the first real live-data loop:

1. User signs up or logs in
2. The app retrieves the current user
3. The app creates or loads the user's portfolio
4. The app displays holdings and portfolio summary
5. The dashboard shows real data instead of mock data

## Roadmap / 路線圖

### Phase 1: Foundation MVP

- stable login / register
- persistent user flow
- portfolio creation
- holdings list
- basic dashboard summary

### Phase 2: Core Tracking Experience

- transactions
- watchlist persistence
- richer analytics
- better loading / error / empty states

### Phase 3: Automation and Data Integrations

- market data integration
- historical performance
- background sync
- multi-currency support

### Phase 4: Intelligence and Personalization

- alerts
- insights
- personalization
- premium reporting

## Near-Term Priorities / 近期優先順序

1. Complete the backend auth flow for real mobile integration
2. Connect Profile to `GET /api/auth/me`
3. Add holdings and portfolio summary APIs
4. Move dashboard and portfolio screens to real data sources
5. Reduce mock data to a development fallback only

## Related Docs / 相關文件

- [backend/README.md](/C:/codex-sandbox/AssetFlow/backend/README.md)
- [docs/Home.md](/C:/codex-sandbox/AssetFlow/docs/Home.md)
- [docs/Product Strategy TW.md](/C:/codex-sandbox/AssetFlow/docs/Product%20Strategy%20TW.md)
- [docs/Product Overview ZH-EN.md](/C:/codex-sandbox/AssetFlow/docs/Product%20Overview%20ZH-EN.md)
