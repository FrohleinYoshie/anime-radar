import type { RssItemDto } from "./rss"

const ANIME_KEYWORDS: string[] = [
    "アニメ",
    "声優",
    "イベント",
    "展示会",
    "コラボ",
    "ポップアップストア",
    "ポップアップ",
    "コラボカフェ",
    "カフェ",
    "コラボイベント",
]

export function filterAnimeItems(items: RssItemDto[]): RssItemDto[] {
    return items.filter((item) => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        return ANIME_KEYWORDS.some((keyword) => title.includes(keyword) || description.includes(keyword));
    });
}