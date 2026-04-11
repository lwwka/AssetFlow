# AssetFlow Product Overview / 產品概覽

## Product Positioning / 產品定位

**中文**

AssetFlow 是一個以手機為核心的投資組合追蹤產品，幫助使用者快速掌握持倉、投資組合表現、自選清單與盈虧變化。

**English**

AssetFlow is a mobile-first investment portfolio tracking product that helps users quickly understand their holdings, portfolio performance, watchlists, and profit-and-loss changes.

## What AssetFlow Is / 產品本質

**中文**

AssetFlow 目前更接近投資資產管理與追蹤工具，而不是交易平台。它的核心價值在於提供清楚的資產視圖，而不是執行交易。

**English**

AssetFlow is currently positioned more as an investment asset management and tracking tool than a trading platform. Its core value is visibility, not trade execution.

## Target Users / 目標使用者

**中文**

- 有股票或 ETF 投資習慣的個人投資者
- 想用手機快速查看資產狀態的人
- 目前主要依賴券商 App 或試算表追蹤投資的人

**English**

- Retail investors managing stocks or ETFs
- Users who want fast mobile visibility into their assets
- People currently tracking investments through broker apps or spreadsheets

## Core User Value / 核心使用者價值

**中文**

AssetFlow 目前希望幫助使用者：

- 追蹤持倉
- 檢視投資組合表現
- 管理自選清單
- 清楚理解目前盈虧

**English**

AssetFlow is currently focused on helping users:

- track holdings
- review portfolio performance
- manage watchlists
- understand current profit and loss clearly

## Tech Stack / 技術架構

**中文**

- 行動端：React Native + Expo
- 行動端語言：TypeScript
- 後端：Spring Boot
- 後端語言：Java 17
- ORM：Spring Data JPA with Hibernate
- 資料庫：PostgreSQL
- 本地開發資料庫：H2 in-memory
- Migration：Flyway
- 後端建置工具：Maven
- 行動端套件管理：npm

**English**

- Mobile: React Native + Expo
- Mobile language: TypeScript
- Backend: Spring Boot
- Backend language: Java 17
- ORM: Spring Data JPA with Hibernate
- Database: PostgreSQL
- Local development database: H2 in-memory
- Migration: Flyway
- Backend build tool: Maven
- Mobile package manager: npm

## Current Product State / 目前產品狀態

**中文**

目前專案已經有：

- Login / Register 畫面
- Dashboard / Portfolio / Watchlist / Profile 畫面
- 基本 auth API
- Portfolio 建立與依使用者查詢 API
- PostgreSQL 與 H2 開發模式

但目前仍有幾個關鍵缺口：

- Dashboard 與 Portfolio 仍以 mock data 為主
- 前端尚未完全以真實登入狀態驅動資料流程
- holdings / transactions / summary 尚未形成完整真實資料閉環
- auth 機制目前仍偏本地開發用途

**English**

The project already includes:

- Login and Register screens
- Dashboard, Portfolio, Watchlist, and Profile screens
- Basic authentication APIs
- Portfolio creation and user portfolio lookup APIs
- PostgreSQL and H2 development modes

However, several key gaps remain:

- Dashboard and Portfolio still rely mainly on mock data
- The frontend is not yet fully driven by real authenticated user state
- holdings / transactions / summary are not yet part of a complete live data flow
- the current auth approach is still development-oriented

## Current Stage / 目前階段

**中文**

目前最準確的階段定義是 `Foundation MVP`。重點不是增加更多功能，而是把第一條真實資料使用者路徑打通。

**English**

The most accurate description of the current stage is `Foundation MVP`. The main priority is not adding more features, but completing the first real user data flow.

## MVP Critical Path / MVP 關鍵閉環

**中文**

現階段最重要的閉環是：

1. 使用者註冊或登入
2. 取得目前使用者資訊
3. 建立或讀取 portfolio
4. 顯示 holdings 與 portfolio summary
5. 讓 dashboard 顯示真實資料而非 mock data

**English**

The most important loop to complete right now is:

1. User signs up or logs in
2. The app retrieves the current user
3. The app creates or loads the user's portfolio
4. The app displays holdings and portfolio summary
5. The dashboard shows real data instead of mock data

## Roadmap / 路線圖

### Phase 1: Foundation MVP

**中文**

- 穩定的 login / register
- 持續使用者流程
- portfolio creation
- holdings list
- 基本 dashboard summary

**English**

- stable login / register
- persistent user flow
- portfolio creation
- holdings list
- basic dashboard summary

### Phase 2: Core Tracking Experience

**中文**

- transactions
- watchlist persistence
- 更豐富的 portfolio analytics
- 更好的 loading / error states

**English**

- transactions
- watchlist persistence
- richer portfolio analytics
- better loading / error states

### Phase 3: Automation and Data Integrations

**中文**

- market data integration
- background sync
- historical performance
- multi-currency support

**English**

- market data integration
- background sync
- historical performance
- multi-currency support

### Phase 4: Intelligence and Personalization

**中文**

- alerts
- insights
- personalization
- premium reporting

**English**

- alerts
- insights
- personalization
- premium reporting

## Near-Term Priorities / 近期優先順序

**中文**

1. 完成 backend auth flow，支援真實 mobile integration
2. 將 Profile 接上 `GET /api/auth/me`
3. 補上 holdings 與 portfolio summary API
4. 將 dashboard / portfolio 改為真實資料來源
5. 將 mock data 降為開發 fallback

**English**

1. Complete the backend auth flow for real mobile integration
2. Connect Profile to `GET /api/auth/me`
3. Add holdings and portfolio summary APIs
4. Move dashboard and portfolio screens to real data sources
5. Reduce mock data to a development fallback only
