# Anime Radar: 完全自動・ゼロコスト・アニオタ特化型レーダー

本プロジェクトは、Next.js、Cloudflare、AIを駆使し、**「運用コスト0円」「メンテナンスフリー」「高収益」**を実現する、インディーハッカーのためのWebサービス・テンプレートである。

---

## プロダクトコンセプト

アニメファンが抱える「散在する推しのイベント・グッズ情報を見落とす」という課題を、公式RSSからの自動収集とAIによる高度な構造化によって解決する。

### 3つの絶対原則

**完全ゼロコスト**  
Cloudflareの無料枠を最大限活用し、インフラ費用の「死の谷」を排除。

**認証レスUX**  
ログイン機能を排除し、localStorageと軽量UIで「1秒で情報に到達」させる。

**SSG最優先**  
サーバー負荷を極限まで減らし、セキュリティと高速表示を担保。

---

## システムアーキテクチャ

システムは「収集・精製（裏側）」と「静的配信（表側）」が完全に分離された疎結合設計。

### 1. 収集・精製ライン (Backend)

**収集**
Cloudflare Workersが数時間おきに **PR TIMES** の公式RSSを巡回。アニメ・マンガ・ゲームカテゴリのプレスリリースを対象とし、グッズ・イベント・コラボ情報を最速で収集する。

**一次フィルター（0円フィルター）**  
TypeScriptの文字列マッチングで、実写・ドラマ・3次元アイドル等のノイズをコスト0で排除し、AIのトークン消費を削減。

**AI Logic（Workers AI）**
Llama 3等の軽量LLMを用い、「作品名」「カテゴリ」「地域」「期間」をJSON形式で抽出。カテゴリはRSSの記事内容からAIが動的に判定するため、事前定義不要。

**Storage**  
Cloudflare D1（5GB無料）へ保存。URLをユニーク制約にすることで重複を自動排除。

**Webhook**  
データ更新時、Cloudflare Pagesへ再ビルド指令を送信。

---

### 2. 静的配信ライン (Frontend / SSG)

**Build**  
Next.jsがD1から全データを取得し、静的HTML/JSONとして出力。

**Delivery**  
Cloudflare Pages（CDN）から配信。通信量無制限。

**Image Hack**  
`unoptimized: true` を設定し、外部URLを直接参照。CSSで最大サイズを固定することでUXと無課金を両立。

---

## 技術スタック

| 担当 | 技術 | 選定理由 |
|-----|-----|-----|
| Framework | Next.js 15+ (App Router) | SSGによる高速表示。ロングテールSEOページ量産 |
| Database | Cloudflare D1 | SQLiteベース。Drizzle ORMで型安全 |
| Logic / AI | Cloudflare Workers | 実行コスト無料。Workers AIを内蔵し外部API不要 |
| Hosting | Cloudflare Pages | 静的エクスポート(SSG)配信。アクセス増加でも課金なし |

### Cloudflareサービス対応表

| サービス | 役割 | 無料枠 |
|---------|------|--------|
| **Workers** | RSS巡回・一次フィルター・AI呼び出しのバックエンドロジック | 1日10万リクエスト |
| **Workers AI** | LLMによるイベント情報の構造化抽出 | 1日のニューロンクォータ制 |
| **D1** | イベントデータの永続化（SQLite） | 5GB |
| **Pages** | Next.js SSGの静的ファイル配信（CDN） | 帯域無制限 |

---

## データベース設計 (Drizzle ORM)

```ts
export const animeEvents = sqliteTable('anime_events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  url: text('url').notNull().unique(),
  description: text('description'),
  thumbnailUrl: text('thumbnail_url'),
  publishedAt: integer('published_at', { mode: 'timestamp' }).notNull(),
  animeTitle: text('anime_title').notNull(),
  category: text('category').notNull(),
  location: text('location'),
  eventStart: text('event_start'),
  eventEnd: text('event_end'),
  isHot: integer('is_hot', { mode: 'boolean' }).default(false),
  status: text('status').default('ANNOUNCED')
});
````

---

## UI / UX戦略（調査結果に基づく）

**カラーコーディング**
カテゴリごとに色を変え、視覚的認知速度を向上。

**FOMO設計**
「終了まであと○日」というカウントダウン表示でユーザーの行動を促す。

**コンテキスト型アフィリエイト**
開催地に応じた「遠征予約（楽天トラベル）」や「在庫確認（Amazon）」ボタンを自動生成。

**カレンダービュー**
リスト表示だけでなく、時間軸で把握できるカレンダー表示を搭載。

---

## マネタイズ / 運用

**アフィリエイト**
旅行、物販。AIが判定した「場所・種別」に応じてリンクを生成。

**AdSense**
動的ルーティングによる個別ページでページビューを増やし広告収益を最大化。

**運用**
基本的に自動運用。月1回程度、AIを利用して一次フィルターのNGワードリストを更新。

---

## 開発ロードマップ

**Phase 1 (MVP)**
Cloudflare WorkersでRSSを取得し、D1に保存。

**Phase 2**
Workers AIによるタグ付けロジックの実装。

**Phase 3**
Next.jsによるフロントエンド構築とSSGデプロイ。

**Phase 4**
X (Twitter) Botによる自動集客エンジンの追加。

---

## ライセンス

本プロジェクトはプロプライエタリソフトウェアです。ソースコードの無断複製・再配布・商用利用を禁じます。
