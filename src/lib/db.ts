import "server-only"
import type { AnimeEvent } from "@/types"

async function queryD1<T>(sql: string, params: (string | number | null)[]): Promise<T[]> {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
    const apiToken = process.env.CLOUDFLARE_API_TOKEN
    const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID

    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sql, params }),
        }
    )

    const data: { result: [{ results: T[] }] } = await res.json()
    return data.result?.[0].results
}

export function getRecentEvents(limit: number) {
    return queryD1<AnimeEvent>(
        `SELECT * FROM anime_events ORDER BY published_at DESC LIMIT ?`,
        [limit]
    )
}

export async function getEventById(id: string) {
    const results = await queryD1<AnimeEvent>(
        `SELECT * FROM anime_events WHERE id = ?`,
        [id]
    )
    return results[0] ?? null
}

export function getEventsByCategory(category: string) {
    return queryD1<AnimeEvent>(
        `SELECT * FROM anime_events WHERE category = ?`,
        [category]
    )
}

export function getEventsByAnimeTitle(title: string) {
    return queryD1<AnimeEvent>(
        `SELECT * FROM anime_events WHERE anime_title = ?`,
        [title]
    )
}

export function getAllAnimeTitles() {
    return queryD1<{ anime_title: string }>(
        `SELECT DISTINCT anime_title FROM anime_events`,
        []
    )
}

export function getAllCategories() {
    return queryD1<{ category: string }>(
        `SELECT DISTINCT category FROM anime_events`,
        []
    )
}