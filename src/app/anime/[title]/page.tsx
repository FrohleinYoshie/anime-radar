import { getAllAnimeTitles, getEventsByAnimeTitle } from "@/lib/db"
import EventList from "@/components/event/EventList"

export async function generateStaticParams() {
    const animeTitle = await getAllAnimeTitles()
    return animeTitle.map((anime) => (
        {title: encodeURIComponent(anime.anime_title)}
    ))
} 

export async function generateMetadata({ params }: {params: {title: string}}) {
    const decodedTitle = decodeURIComponent(params.title)
    return {
        title: decodedTitle,
        description: `${decodedTitle}のイベント情報`
    }
}

export default async function AnimePage({params}: {params: {title: string}}) {
    const { title } = await params
    const decodedTitle = decodeURIComponent(title)
    const eventData = await getEventsByAnimeTitle(decodedTitle)
    return(
        <>
        <h1>{decodedTitle}</h1>
        <p>関連イベント</p>
        <EventList events={eventData}/>
        </>
    )
} 