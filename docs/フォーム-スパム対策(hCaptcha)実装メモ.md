# フォーム スパム対策（hCaptcha + honeypot）実装メモ

最終更新: 2026-06-02
対象: ZGlobal HP の予約／お問い合わせフォーム（ja/en/zh/ko の `contact.html` 全4ページ）

略語（初出全称併記）: hCaptcha（human Captcha / 人間判定キャプチャ）、BFF（Backend For Frontend）、njs（nginx JavaScript module）、API（Application Programming Interface）、FTP（File Transfer Protocol）、CDN（Content Delivery Network）、DNS（Domain Name System）、TLS（Transport Layer Security）、CA（Certificate Authority）、UI（User Interface）。

---

## 0. 何をしたか（要約）

www.fly-japan.jp と**同じ「人間チェック」体験（hCaptcha チェックボックス + honeypot）**を全フォームに追加した。
ただし fly-japan.jp は送信先が Web3Forms（メール化）なのに対し、ZGlobal は**既存の予約 API 連携（`/api/reserve` → hire-service、予約番号発行）を維持**したまま、その手前に人間チェックを差し込む構成にした（2026-06-02 のユーザー選択）。

**肝**: キャプチャは「フロントに置くだけ」では飾りで、直接 POST するボットに突破される。そこで **BFF（nginx njs）でサーバー側検証**してから hire-service に中継する。PHP は不使用。

---

## 1. アーキテクチャ

```
ブラウザ（contact.html + reserve.js）
  │  hCaptcha ウィジェットを解く → トークン取得
  │  POST /api/reserve  { 予約項目..., botcheck:"", hcaptchaToken:"P1_..." }（同一オリジン）
  ▼
nginx BFF（zglobal.fly-japan.jp コンテナ） … deploy/zglobal-hp/
  reserve_guard.js（njs, js_content）
   1) honeypot（botcheck）が立っていたら 400 で破棄
   2) hcaptchaToken が無ければ 403
   3) api.hcaptcha.com/siteverify にトークン + HCAPTCHA_SECRET を POST 検証
      └ 失敗 → 403 / 検証不能 → 502
   4) 成功 → botcheck・hcaptchaToken を除去し、内部 /__reserve_upstream へ
  ▼
proxy_pass ${HIRESERVICE_API_BASE}/v1/public-bookings（hire-service 公開予約 API）
  ▼
201 + 予約番号 等を、BFF がそのままブラウザへ中継
```

honeypot = 画面に出ない隠しチェックボックス。人間は触れない。ボットが機械的に全チェックを入れると引っかかる。

---

## 2. 変更したファイル

| ファイル | 変更 |
|---|---|
| `dev/site/contact.html` ほか en/zh/ko 計4枚 | フォーム内に honeypot + `<div class="h-captcha">` ウィジェット + キャプチャ用エラー文を追加。`</body>` 前に hCaptcha API スクリプトを追加。`data-hl` は各言語（ja/en/zh/ko） |
| `dev/site/js/reserve.js` | トークン取得（`getCaptchaToken`）・honeypot とトークンを payload に同梱・送信前にトークン必須バリデーション・403 ハンドリング・送信後の `hcaptcha.reset()` |
| `dev/site/js/i18n.js` | `reserve.err.captcha` を4言語追加 |
| `deploy/zglobal-hp/reserve_guard.js`（新規） | njs ガード本体（honeypot 判定 + siteverify + 中継） |
| `deploy/zglobal-hp/default.conf.template` | `/api/reserve` を `js_content` 化、内部 `/__reserve_upstream` を新設、`resolver` / `js_fetch_trusted_certificate` を追加 |
| `deploy/zglobal-hp/Dockerfile` | `nginx-module-njs` + `ca-certificates` 導入、`load_module` と `env HCAPTCHA_SECRET;` を nginx.conf 主コンテキストへ前置、`HCAPTCHA_SECRET` の既定（テスト鍵）を ENV 化 |
| `deploy/zglobal-hp/docker-compose.yml` | `HCAPTCHA_SECRET` を `.env` から注入できるよう `environment` 追加 |

---

## 3. hCaptcha 鍵（本番運用中）

**2026-06-03: 実鍵を投入済み・スパム保護 ON（zglobal.fly-japan.jp で実機検証済み。偽トークン→403 captcha_failed を確認）。**

- フロント **Site Key（公開）**: `44ced706-b740-4c78-806c-86426f4ab20a` → 4枚の `contact.html` の `data-sitekey`（git 管理下・公開情報なので問題なし）
- サーバー **Secret Key（秘密 / `ES_…` 形式）**: hCaptcha の **Account-level Secret**。**自宅 `~/docker/zglobal-hp/.env` の `HCAPTCHA_SECRET` にのみ保存**（git 管理外・`chmod 600`）。**リポジトリには絶対に置かない**。
- hCaptcha ダッシュボードの Domains に `zglobal.fly-japan.jp` 登録済み。**www.z-global.jp 統合時は `z-global.jp` / `www.z-global.jp` も追加が必要**（§9-6）。
- Secret はダッシュボードでコピー不可。紛失時は「Generate New Secret」で再生成し `.env` を更新（残ローテーション数に注意）。

<details><summary>（参考）テスト鍵で機構検証 → 実鍵へ差し替えた当初手順</summary>

検証用に最初は hCaptcha 公式テスト鍵（Site `10000000-ffff-ffff-ffff-000000000001` / Secret `0x000…0`、常に成功）で BFF 機構を確認し、その後 hCaptcha アカウントの実鍵へ差し替えた。再度差し替える場合の手順:

### 手順
1. https://www.hCaptcha.com/ で無料アカウント作成 → サイト追加（ドメイン `z-global.jp` / `zglobal.fly-japan.jp` を登録）。
2. 発行された **Site Key** と **Secret Key** を控える。
3. **Site Key** を4枚の `contact.html` の `data-sitekey="..."` に貼り替え（ja/en/zh/ko すべて）。
   - 一括置換の目安: `10000000-ffff-ffff-ffff-000000000001` → 実 Site Key。
4. **Secret Key** をコンテナ環境変数 `HCAPTCHA_SECRET` に設定。**git にコミットしない**。
   - `deploy/zglobal-hp/.env`（gitignore 済みの場所）に `HCAPTCHA_SECRET=0x実シークレット` を置く → compose が注入。
5. 再ビルド・再起動（§4）。

> 補足: 無料プランの hCaptcha は自前 Site/Secret Key をそのまま使える（fly-japan.jp が Web3Forms 経由で「共有鍵」を使っていたのは Web3Forms 無料プランの制約。ZGlobal は自前検証なのでこの制約は無い）。

</details>

---

## 4. デプロイ

### 4-1. zglobal.fly-japan.jp（自宅 Ubuntu / Docker）= 人間チェックが効くのはここ

CLAUDE.md「Ubuntu自宅サーバーにデプロイ」に準拠。
1. `dev/site/` を `deploy/zglobal-hp/site/` へ同期（HTML/JS の変更を反映）。
2. 自宅 PC へ配置し再ビルド:
   ```bash
   docker compose -f ~/docker/zglobal-hp/docker-compose.yml up -d --build
   ```
   - `nginx-module-njs` の apk 取得がビルド時に走る。失敗したらログを確認（§6）。
3. §5 の動作確認。

### 4-2. www.z-global.jp（お名前.com 静的 FTP）= ⚠️ 制約あり

- ここには BFF が無く `/api/reserve` は **HTTP 404**（＝**人間チェック追加前から予約フォームは送信不可**）。
- フロントの変更（ウィジェット表示・入力検証）は FTP で反映できるが、**送信自体は依然 404 で失敗**する。
- 対処は §7。

---

## 5. 動作確認（zglobal.fly-japan.jp）

```bash
H=zglobal.fly-japan.jp

# 1) トークン無し → 403（captcha_required）
curl -sS -o - -w "\n[%{http_code}]\n" -X POST "https://$H/api/reserve" \
  -H "Content-Type: application/json" -d '{"name":"t"}'

# 2) honeypot 有り → 400（spam_detected）
curl -sS -o - -w "\n[%{http_code}]\n" -X POST "https://$H/api/reserve" \
  -H "Content-Type: application/json" -d '{"botcheck":"on","hcaptchaToken":"x"}'

# 3) テスト鍵運用中なら、ダミートークンで siteverify を通過し hire-service へ到達
#    （hire-service 側のバリデーションで 400/201 が返れば BFF 中継は成功）
curl -sS -o - -w "\n[%{http_code}]\n" -X POST "https://$H/api/reserve" \
  -H "Content-Type: application/json" \
  -d '{"hcaptchaToken":"10000000-aaaa-bbbb-cccc-000000000001","name":"テスト","phone":"09000000000","pickupAt":"2026-07-01T10:00:00+09:00","pickupLocation":"成田","dropoffLocation":"羽田","passengerCount":1,"source":"web"}'
```

ブラウザ確認: `https://zglobal.fly-japan.jp/contact.html` で
- hCaptcha ウィジェットが表示される
- 未チェックで送信 → 「スパム対策の認証にチェックを入れてください。」
- チェック後に送信 → 予約番号付きの完了画面

---

## 6. つまずきポイント

- **njs モジュールが入らない / `unknown directive "js_content"`**: `apk add nginx-module-njs` が nginx 本体とバージョン不一致。`nginx:alpine` は nginx.org の apk リポジトリが設定済みなので通常は一致する。失敗時はベースイメージのタグを固定し直す。
- **`process.env.HCAPTCHA_SECRET` が undefined**: nginx はワーカーへ環境変数を渡さない。Dockerfile で `env HCAPTCHA_SECRET;` を nginx.conf 主コンテキストに前置している（これが無いと njs から読めない）。
- **siteverify が TLS で失敗**: `ca-certificates` 未導入。Dockerfile で導入し `js_fetch_trusted_certificate /etc/ssl/certs/ca-certificates.crt;` を指定済み。
- **siteverify の名前解決に失敗**: `resolver 127.0.0.11`（Docker 内蔵 DNS）。host ネットワーク等で使えない場合は `1.1.1.1 8.8.8.8` に変更。
- **常に検証が通ってしまう**: テスト鍵のまま。§3 で実鍵へ差し替え。

---

## 7. www.z-global.jp（静的 FTP）も送信可能にする選択肢

現状ここは BFF が無く送信不可。人間チェックの有無に関係なく、以下のいずれかが別途必要:

- **(A) www.z-global.jp を zglobal.fly-japan.jp に寄せる / 同 BFF 配下に置く**（CNAME や統合）。最もシンプルに「予約 API + 人間チェック」を両立。
- **(B) www.z-global.jp だけ Web3Forms 方式にする**（fly-japan.jp と同型のサーバーレス送信。予約番号は出ないがメールは届く）。`reserve.js` を host 判定で分岐すれば両ドメイン共存も可能。
- **(C) 静的ホスト側にリバースプロキシ/Functions を用意**して `/api/reserve` を hire-service に中継（お名前.com 共有では不可。要 VPS 等）。

→ ここは要判断。現状の実装は (A) を前提に「BFF がある zglobal.fly-japan.jp で完全動作」する。

---

## 8. ロールバック

すべて git 管理下。問題時は対象コミットを `git revert` して再ビルド／再 FTP すれば元の挙動に戻る（BFF は元の単純 `proxy_pass` に戻る）。

---

## 9. 【採用】案1: www.z-global.jp を自宅サーバーへ統合する手順（runbook）

目的: 本番メイン www.z-global.jp を、BFF（＋hCaptcha＋予約API）が動く自宅サーバー（zglobal-hp コンテナ）で配信し、予約フォームを完全動作させる。

### 9-0. 現状 DNS（2026-06-02 実測）

| レコード | 現在 | 備考 |
|---|---|---|
| `www.z-global.jp` A | `160.251.71.148` | お名前.com Web。これを VPS へ |
| `www.z-global.jp` AAAA | `240d:f:9fc:bb00:...` | IPv6。要削除 or VPS の v6 へ |
| `z-global.jp`(apex) A / AAAA | 同上 | apex も移すなら同様に |
| `z-global.jp` MX | `mail48.onamae.ne.jp` | **メール。絶対に触らない** |
| NS | `ns-rs1/2.gmoserver.jp` | DNS 管理は お名前.com 側 |

### 9-1. リポジトリ側（実施済み）

- `docker-compose.yml` の Caddy ラベルに `http://www.z-global.jp` を追加（home-caddy がこのコンテナへ www も振り分ける）。**DNS と VPS Caddy が揃うまでは無害・無効**。

### 9-2. お名前.com 管理画面で DNS 変更（★ユーザー作業。Claude は不可）

1. （推奨）事前に対象レコードの **TTL を 300 秒程度に下げて**おく（切替を速く・戻しやすく）。
2. `www.z-global.jp` の **A** を `160.251.71.148` → **`160.251.172.51`**（リバプロ VPS）。
3. `www.z-global.jp` の **AAAA(IPv6)** を **削除**（VPS が IPv6 を持たないため。残すと IPv6 のお客様は旧サーバー＝壊れたフォームに行く）。
4. apex も移す場合のみ: `z-global.jp` の A→`160.251.172.51`、AAAA 削除。
5. **触らないレコード**: `MX(mail48.onamae.ne.jp)` / SPF などの TXT / DKIM / `mail` ホスト / その他メール関連。← メール保護の生命線。

### 9-3. VPS Caddy にブロック追加（SSH: `root@100.64.222.25` / Tailscale 経由のみ）

```caddyfile
# /root/docker/caddy/Caddyfile
www.z-global.jp {
    import home_backend
}
# apex も移す場合のみ（canonical は www なので apex→www へ 301）
z-global.jp {
    redir https://www.z-global.jp{uri} permanent
}
```

- 編集前にバックアップ: `cp /root/docker/caddy/Caddyfile /root/docker/caddy/Caddyfile.bak.$(date +%Y%m%d_%H%M%S)`
- **BOM/CR 混入注意**（CLAUDE.md 参照）。VPS 上で直接 vim 編集が安全。混入したら `sed -i 's/\xEF\xBB\xBF//g; s/\r$//' /root/docker/caddy/Caddyfile`。
- 反映: `docker exec caddy caddy reload --config /etc/caddy/Caddyfile`（証明書は DNS が VPS を向いた後に Let's Encrypt が自動取得）。

### 9-4. 自宅サーバーでコンテナ更新

```bash
# dev/site -> deploy/zglobal-hp/site 同期（hCaptcha 変更込み）後、自宅 PC へ配置して
docker compose -f ~/docker/zglobal-hp/docker-compose.yml up -d --build
# home-caddy が www.z-global.jp ラベルを認識したか
docker logs home-caddy --tail 30 | grep -i "z-global.jp"
```

### 9-5. 検証

```bash
# 外部 HTTPS で 200 + Let's Encrypt 証明書
curl -sIL https://www.z-global.jp/contact.html | grep -iE "HTTP/|server:"
# 予約 API が www でも生きているか（404 でなくなる）
curl -sS -o - -w "\n[%{http_code}]\n" -X POST https://www.z-global.jp/api/reserve \
  -H "Content-Type: application/json" -d '{}'   # 403(captcha_required) が返れば BFF 稼働
# メールが生きているか（MX 不変の確認）
nslookup -type=MX z-global.jp
```

### 9-6. 切替前に必ず決める/直す

- **予約 API の接続先**: `HIRESERVICE_API_BASE` が現状 **staging（`api-renew.fly-japan.jp`）**。本番顧客の予約が staging に流れてよいか／本番 API を用意するか（Dockerfile/compose の env で変更）。
- **実 hCaptcha キー**（§3）に差し替え（本番公開でテストキーは無防備）。
- **可用性**: 本番メイン＋SEO ドメインが「自宅 PC＋Tailscale＋VPS」依存になる。自宅が落ちると本番も落ちる。
- お名前.com の Web 配信は使わなくなる（FTP デプロイ [[ftp-deploy]] は不要に）。ただしメールは お名前.com のまま。

### 9-7. ロールバック（切替に問題が出たら）

`www.z-global.jp` の A を `160.251.71.148`・AAAA を元の値へ戻すだけで お名前.com 配信（静的）に即復帰。TTL を下げてあれば数分。コンテナ／VPS 変更は据え置きで害なし。
