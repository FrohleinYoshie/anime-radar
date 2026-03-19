import { generateMapLink } from "@/lib/map";

export default function MapLink({location}: {location: string | null}) {
    if (!location) return null
    return (
        <a target="_blank" rel="noopener noreferrer" href={generateMapLink(location)}>
            イベント会場を見る
        </a>
    )
}


