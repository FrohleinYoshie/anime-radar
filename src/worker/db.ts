import type { AiResult } from "./ai";
import type { RssItemDto } from "./rss";

interface Env {
    DB: D1Database
}

export async function saveEvent(rssItem: RssItemDto, aiResult: AiResult, env: Env) {
    const uuid = crypto.randomUUID()
    try {
        await env.DB.prepare(
            `INSERT OR IGNORE INTO anime_events
            (id, title, url, description, published_at, anime_title, category, location, event_start, event_end, is_hot)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            uuid,
            rssItem.title,
            rssItem.url,
            rssItem.description,
            rssItem.publishedAt,
            aiResult.animeTitle,
            aiResult.category,
            aiResult.location,
            aiResult.eventStart,
            aiResult.eventEnd,
            aiResult.isHot
        ).run()
    } catch (e) {
        console.error("[DB] 書き込みエラー:", e);
    }
}
