import type { RssItemDto } from "./dto";
import { createRssItemDto } from "./factory";

const RSS_BASE_URL = "https://prtimes.jp";
const ALL_RSS_URL = `${RSS_BASE_URL}/index.rdf`;

/**
 * PR TIMES の全件 RSS を取得して RssItemDto の配列を返す
 *
 * - Cloudflare エッジキャッシュ（1日）でオリジンへの重複リクエストを防ぐ
 * - 失敗時は空配列を返す（Worker をクラッシュさせない）
 */
export async function fetchRssItems(): Promise<RssItemDto[]> {
  const xml = await fetchRssXml();
  if (!xml) return [];

  return parseItemsFromXml(xml);
}

// --- 内部関数 ---

async function fetchRssXml(): Promise<string | null> {
  const res = await fetch(ALL_RSS_URL, {
    // Cloudflare エッジキャッシュ: 1日（86400秒）
    cf: { cacheTtl: 86400 },
  }).catch((error: unknown) => {
    console.error("[RSS] ネットワークエラー:", { url: ALL_RSS_URL, error });
    return null;
  });

  if (!res) return null;

  if (!res.ok) {
    console.error("[RSS] フェッチ失敗:", { url: ALL_RSS_URL, status: res.status });
    return null;
  }

  return res.text().catch((error: unknown) => {
    console.error("[RSS] テキスト変換エラー:", error);
    return null;
  });
}

function parseItemsFromXml(xml: string): RssItemDto[] {
  // <item rdf:about="URL">...</item> を全件取得
  const itemMatches = [
    ...xml.matchAll(/<item rdf:about="([^"]*)">([\s\S]*?)<\/item>/g),
  ];

  return itemMatches.map((match) => {
    const guid = match[1];    // rdf:about の URL（記事の一意ID）
    const itemXml = match[2]; // <item> の中身
    return createRssItemDto(itemXml, guid);
  });
}
