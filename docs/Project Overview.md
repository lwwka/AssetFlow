# 產品概覽

## 產品定位

AssetFlow 是一個以手機為核心的投資組合追蹤產品，使用 React Native + Expo 建立行動端，並以 Spring Boot 作為後端服務。

## 產品目標

AssetFlow 目前聚焦幫助使用者：

- 追蹤持倉
- 檢視投資組合表現
- 管理自選清單
- 清楚理解目前盈虧

## 技術架構

- Mobile: React Native + Expo
- Mobile language: TypeScript
- Backend: Spring Boot
- Backend language: Java 17
- ORM: Spring Data JPA with Hibernate
- Database: PostgreSQL
- Local development database: H2 in-memory
- Database migration: Flyway

## 目前專案範圍

- `mobile/`
- `backend/`
- `docs/`

## 目前開發狀態

- 行動端登入與註冊流程已建立
- Dashboard、Portfolio、Watchlist、Profile 畫面已存在
- 後端 auth API 已存在
- 後端 portfolio 建立與查詢 API 已存在
- 本地開發模式可使用 H2 in-memory profile
- 文件已整理為適合 Obsidian 閱讀的結構

## 當前產品階段

目前專案處於 `Foundation MVP` 階段。

重點不是再擴充功能數量，而是完成第一條真實資料閉環：

1. 使用者註冊或登入
2. 取得目前使用者資訊
3. 建立或讀取 portfolio
4. 顯示 holdings 與 summary
5. 讓 dashboard 顯示真實資料而非 mock data
