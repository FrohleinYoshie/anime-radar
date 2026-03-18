export const CATEGORIES = [
    { name: "アニメ", slug: "anime", color: "bg-blue-100"},
    { name: "イベント", slug: "event", color: "bg-green-100"},
    { name: "コラボ", slug: "collab", color: "bg-purple-100"},
    { name: "カフェ", slug: "cafe", color: "bg-pink-100"},
    { name: "グッズ", slug: "goods", color: "bg-yellow-100"},
    { name: "その他", slug: "other", color: "bg-gray-100"},
] as const;

export const NG_WORDS: string[] = [
    "俳優",
    "ミュージカル",
    "舞台",
    "実写",
]