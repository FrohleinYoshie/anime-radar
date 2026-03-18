import type { RssItemDto } from "./dto";

/**
 * RDF XML の <item> ブロック1件から RssItemDto を生成する
 *
 * @param itemXml  <item> タグの中身
 * @param guid     <item rdf:about="..."> の属性値（一意ID）
 */
export function createRssItemDto(itemXml: string, id: string): RssItemDto {
  return {
    id,
    title: getTagValue(itemXml, "title"),
    url: getTagValue(itemXml, "link"),
    description: getTagValue(itemXml, "description"),
    publishedAt: getTagValue(itemXml, "dc:date"),
  };
}

/**
 * XML タグの値を取り出す
 * CDATA形式・プレーンテキスト形式の両方に対応
 */
function getTagValue(xml: string, tag: string): string {
  // CDATA 形式: <tag><![CDATA[値]]></tag>
  const cdataMatch = xml.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  );
  if (cdataMatch) return cdataMatch[1].trim();

  // プレーンテキスト形式: <tag>値</tag>
  const plainMatch = xml.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
  );
  return plainMatch ? plainMatch[1].trim() : "";
}
