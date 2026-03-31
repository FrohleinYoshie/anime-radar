/// <reference types="@cloudflare/workers-types" />
import { fetchRssItems } from "./rss";
import { filterAnimeItems } from "./filter";
import { analyzeWithAI } from "./ai";
import { saveEvent } from "./db";

// wrangler.toml の [[d1_databases]] binding に対応する型
export interface Env {
  DB: D1Database;
  AI: Ai;
}

// Cron トリガーで呼ばれるエントリポイント
const handler = {
  async scheduled(_event: ScheduledEvent, env: Env) {
    const allItems = await fetchRssItems();
    const animeItems = filterAnimeItems(allItems);
    for (const items of animeItems) {
      const analyzeWithAiData = await analyzeWithAI(items, env)
      if (analyzeWithAiData) {
        await saveEvent(items, analyzeWithAiData, env)
      } else {
        console.error("AIパースエラー")
      }
    }
  },
};

export default handler;
