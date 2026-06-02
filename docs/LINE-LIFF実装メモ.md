# HP 側 LINE (LIFF) 予約フォーム 実装メモ

最終更新: 2026-05-29
対象: `zglobal.fly-japan.jp` (静的 HTML + nginx BFF)

略語 (初出全称併記): LIFF (LINE Front-end Framework)、LINE 公式アカウント (LINE Official Account)、BFF (Backend For Frontend)、HP (Homepage)、API (Application Programming Interface)、SDK (Software Development Kit)、JWT (JSON Web Token)、UI (User Interface)。

---

## 0. 詳細設計の正本はこちら

LINE 連携の**全体設計 (受信 + 送信・データモデル・LINE Developers 準備手順・シーケンス図・段階計画) は hire-service 側に集約**されています。本書は **HP 側で行う作業だけ**を抜き出した実装メモです。

- 正本: `C:\work\workspace\hireservice_renew\docs\design\F07_public_booking_webhook\line_integration.md`
- API 受け渡し仕様: `C:\work\workspace\hireservice_renew\PublicReserveAPIAndPrompts.md`

---

## 1. HP 側の作業範囲

LINE 予約は「リッチメニュー → LIFF (LINE 内ブラウザ) で HP の予約フォームを開く → 送信」という流れです。HP がやるのは **LIFF 対応の予約フォームページ**と **BFF の小さな拡張**だけ。userId の検証・LINE プッシュ送信は hire-service 側です。

| # | 作業 | ファイル | 状態 |
|---|---|---|:--:|
| 1 | LIFF 予約フォームページ新設 | `dev/site/liff/reserve.html` (新規) | 未 |
| 2 | LIFF 用 JS (SDK 初期化 + 既存 reserve.js 流用) | `dev/site/js/liff-reserve.js` (新規) | 未 |
| 3 | BFF が `source=line` + `lineIdToken` を中継できるよう確認/調整 | `deploy/zglobal-hp/default.conf.template` | 要確認 |
| 4 | LIFF ID を埋め込み (公開情報なので直書き可) | `reserve.html` 内 | 未 |

> 既存の web 予約フォーム (`dev/site/contact.html` + `js/reserve.js`) は**そのまま維持**。LIFF 版は別ページとして追加し、送信時の `source` だけ `line` にする。

---

## 2. LIFF ページの作り方 (既存フォーム流用)

`contact.html` の予約フォーム部分を流用し、以下の差分だけ加えた `dev/site/liff/reserve.html` を作る:

```html
<!-- head に LIFF SDK -->
<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
<!-- 既存 -->
<script src="js/i18n.js"></script>
<script src="js/reserve.js"></script>      <!-- 検証・ISO変換ロジックを流用 -->
<script src="js/liff-reserve.js"></script> <!-- LIFF 固有処理 -->
```

`liff-reserve.js` の役割:
1. `liff.init({ liffId: "<LIFF_ID>" })` → 未ログインなら `liff.login()`
2. `liff.getProfile()` の `displayName` を氏名欄にプリフィル
3. `liff.getIDToken()` で ID トークン (JWT) を取得して保持
4. `liff.getFriendship()` で友だち状態を確認 → 未追加なら案内バナー表示 (通知を受け取るには友だち追加が必要)
5. フォーム送信時の payload に **`source: "line"` と `lineIdToken`** を追加して BFF (`/api/reserve`) に POST
6. 成功時、完了画面に予約番号表示 + `liff.closeWindow()` 導線

> 既存 `reserve.js` は `source:"web"` 固定で `/api/reserve` に POST している。LIFF 版では送信直前に `source` と `lineIdToken` を差し替える薄いラッパにするのが楽 (reserve.js のリファクタで送信関数を分離 or LIFF 版で payload を再構築)。

---

## 3. BFF 側の確認点

現状の BFF (`default.conf.template`) は `/api/reserve` の **リクエストボディをそのまま** hire-service の `POST /v1/public-bookings` に中継している。`source` や `lineIdToken` は JSON ボディの一部なので **追加フィールドは透過的に通る**。基本は改修不要。

確認だけ:
- `lineIdToken` は長め (JWT) なのでボディサイズ問題なし。
- LIFF は HTTPS 必須 → 既に Caddy で TLS 終端済みで OK。
- LINE 内ブラウザの User-Agent でも問題なく動く (静的配信のため)。

---

## 4. LIFF ID の扱い

- LIFF ID は **公開情報**。静的サイトなので `reserve.html` / `liff-reserve.js` に直接書いてよい (秘匿不要)。
- **Channel secret / access token は HP に置かない**。それらは hire-service 側だけが持つ (userId 検証・プッシュ送信に使用)。

---

## 5. デプロイ

既存 HP と同じ流れ (CLAUDE.md「Ubuntu自宅サーバーにデプロイ」):
1. `dev/site/liff/` を含めて `deploy/zglobal-hp/site` に同期
2. `docker compose up -d --build` で `zglobal-hp` 再ビルド
3. `https://zglobal.fly-japan.jp/liff/reserve.html` が 200 を返すこと
4. LINE Developers の LIFF エンドポイント URL をこの URL に設定 (hire-service 設計書 §4 手順 4)

---

## 6. 前提 (hire-service 側の完了が必要)

HP 単独では完結しない。以下が hire-service 側で整って初めて LINE 予約が成立する (設計書 §11 ギャップ分析参照):
- `POST /v1/public-bookings` が `source=line` + `lineIdToken` 検証に対応
- `public_bookings.line_user_id` カラム追加
- (送信を使うなら) `webhook_outbox(target=line)` + プッシュ Processor

→ HP 側 (本メモ) と hire-service 側 (設計書) は**セットで進める**。着手順は設計書 §12 の L0→L1→L2。
