import type { RssItemDto } from "./rss";

export interface AiResult {
    animeTitle: string;
    category: string;
    location: string | null;
    eventStart: string | null;
    eventEnd: string | null;
    isHot: number;
}

export async function analyzeWithAI(item: RssItemDto, env:any): Promise<AiResult | null> {
    const prompt: string = `
    以下の PR TIMES のプレスリリースを分析し、
    「アニメ関連イベント」であるかどうかを判定してください。

    【判定基準】
    - アニメのタイトルが含まれている
    - アニメのキャラクターや声優が登場する
    - アニメのコラボレーション企画である

    【出力形式】
    JSON 形式で以下のフィールドを出力してください：
    {
        "animeTitle": "作品名（例: 推しの子）",
        "category": "アニメ | イベント | コラボ | カフェ | グッズ | その他",
        "location": "開催場所（不明なら null）",
        "eventStart": "開始日 YYYY-MM-DD（不明なら null）",
        "eventEnd": "終了日 YYYY-MM-DD（不明なら null）",
        "isHot": 0
    }
    `
    try {
        const response = await env.AI.run(
            "@cf/meta/llama-3.1-8b-instruct",
            {
                messages: [
                    {role: "system", content: prompt},
                    {role: "user", content: `
                    【分析対象】
                    タイトル: ${item.title}
                    説明: ${item.description}
                    `}
                ],
                response_format: {
                    type: "json_object"
                }
            }
        )
        return JSON.parse(response.response);
    } catch (e) {
            console.error("AI Error", e);
            return null
        }

}