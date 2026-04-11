# AssetFlow 產品定位與執行重點

## 一句話定位

AssetFlow 是一個以手機為核心的投資組合追蹤產品，幫助使用者快速掌握自己的持倉、投資組合表現、自選清單與盈虧變化。

## 產品本質

AssetFlow 目前更接近「投資資產管理與追蹤工具」，而不是交易平台。

這代表產品的核心價值不是下單，而是：

- 讓使用者知道自己持有什麼
- 讓使用者理解目前資產配置
- 讓使用者快速看到投資組合表現
- 讓使用者持續追蹤關注標的

## 目標使用者

目前最適合的目標使用者是：

- 有股票或 ETF 投資習慣的個人投資者
- 想用手機快速查看資產狀態的人
- 不一定需要複雜交易功能，但需要清楚的投資總覽與持倉資訊的人

現階段不應把自己定位成：

- 專業交易終端
- 券商替代品
- 高頻交易工具
- 深度研究平台

## 現在實際做到哪裡

從文件與程式實作來看，目前已經有以下基礎：

### Mobile

- Login / Register 畫面已存在
- Dashboard / Portfolio / Watchlist / Profile 畫面已存在
- App 整體導覽流程已建立

### Backend

- Auth API 已存在
- Portfolio 建立與依使用者查詢 API 已存在
- PostgreSQL 與 H2 開發模式都已配置
- 基本資料表與 domain model 已建立

### 目前的主要限制

- Dashboard 與 Portfolio 畫面仍以 mock data 為主
- 前端尚未真正以登入後的使用者資料驅動 portfolio 流程
- holdings / transactions / summary 仍未形成完整真實資料閉環
- auth 目前偏開發用途，尚非正式可上線的 session / JWT 架構

## 真正的產品階段判讀

目前階段不是「功能規劃不清」，而是「產品主軸清楚，但仍停在 MVP 骨架階段」。

比較準確的描述是：

> 你已經有一個投資組合追蹤 App 的前後端骨架，但尚未完成第一條真正可驗證價值的使用者路徑。

## 現在最重要的 MVP 閉環

在這個階段，最重要的不是增加更多功能，而是完成以下流程：

1. 使用者註冊或登入
2. 取得目前使用者資訊
3. 建立或讀取使用者 portfolio
4. 顯示 holdings 與 portfolio summary
5. 讓 dashboard 顯示真實資料而非 mock data

只要這條鏈打通，AssetFlow 就會從「概念完整的原型」變成「可驗證的 MVP」。

## 建議的產品優先順序

### Priority 1: 完成真實資料閉環

目標是讓使用者登入後，看到的是自己的真實 portfolio。

需要完成：

- 前端保存登入後的 user / token 狀態
- Profile 接上 `GET /api/auth/me`
- Portfolio 頁面接上後端 portfolio API
- Dashboard 至少讀取真實 portfolio 基本資訊
- 將目前 mock data 模式改成 fallback，而不是主流程

### Priority 2: 補足核心 portfolio 資料模型

目標是讓產品真正支援投資組合而不是只支援畫面展示。

需要完成：

- holdings endpoint
- portfolio summary endpoint
- transactions endpoint
- portfolio 與 holding 的基本建立與查詢流程

### Priority 3: 做出可持續使用的體驗

目標是讓使用者願意持續回來使用。

需要完成：

- watchlist persistence
- 更清楚的 loading / error states
- 首次建立 portfolio 的 onboarding
- 更穩定的 auth 與 session 機制

## 未來 Roadmap 應該怎麼看

### Phase 1

先證明這個產品真的能幫使用者管理投資組合。

重點：

- stable login / register
- persistent user flow
- portfolio creation
- holdings list
- dashboard summary

### Phase 2

把「能用」提升到「值得日常使用」。

重點：

- transactions
- watchlist persistence
- richer analytics
- better empty / loading / error states

### Phase 3

開始建立產品差異化與資料深度。

重點：

- market data integration
- historical performance
- background sync
- multi-currency support

### Phase 4

進入進階價值與潛在商業化能力。

重點：

- alerts
- insights
- personalization
- premium reporting

## 接下來四週的實際執行建議

### 第 1 週

- 接通 login / register 與前端使用者狀態
- 接通 `GET /api/auth/me`
- 讓 Profile 顯示真實使用者資訊

### 第 2 週

- 接通 portfolio list / create
- 完成首次 portfolio 建立流程
- 移除前端對 portfolio 身分的硬編碼假設

### 第 3 週

- 補 holdings 與 summary API
- Dashboard 改為吃真實資料
- Portfolio 頁面改為吃真實 holdings

### 第 4 週

- 整理 loading / error / empty states
- 補最基本的端對端驗證流程
- 將 mock data 降為開發 fallback 模式

## 現階段最關鍵的產品判斷

如果你現在只能做一件最重要的事，那件事不是新增 watchlist 功能，也不是做市場資料整合。

而是：

> 先讓登入後的使用者，真的能看到自己的 portfolio 與基本摘要。

這是 AssetFlow 現階段最重要的產品里程碑。
