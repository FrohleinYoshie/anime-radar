/// <reference types="@cloudflare/workers-types" />
import { fetchRssItems } from "./rss";
import { filterAnimeItems } from "./filter";

// wrangler.toml の [[d1_databases]] binding に対応する型
export interface Env {
  DB: D1Database;
}

// Cron トリガーで呼ばれるエントリポイント
export default {
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext) {
    console.log("[Worker] Cron 開始");

    const allItems = await fetchRssItems();
    console.log(`[Worker] RSS 取得: ${allItems.length} 件`);

    const animeItems = filterAnimeItems(allItems);
    console.log(`[Worker] フィルタ後: ${animeItems.length} 件`);

    // TODO: ai.ts → db.ts の処理をここに追加
  },
};
