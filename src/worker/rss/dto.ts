/**
 * PR TIMES RSS（RDF形式）から取得した生データの型
 *
 * - guid    : <item rdf:about="..."> の属性値（一意ID）
 * - pubDate : <dc:date> の値（ISO 8601形式）
 *
 * アプリ内部の型（AnimeEvent など）への変換は factory.ts で行う
 */
export interface RssItemDto {
  guid: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
}
