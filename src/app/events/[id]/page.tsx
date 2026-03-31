import { notFound } from "next/navigation";
import { getCategoryColor } from "@/lib/category";
import { getEventById, getRecentEvents } from "@/lib/db";
import CountdownBadge from "@/components/event/CountdownBadge";
import MapLink from "@/components/event/MapLink";

export async function generateStaticParams() {
    const events = await getRecentEvents()
    return events.map((event) => (
        {id: event.id}
    ))
}

export default async function EventPage({params}: {params: {id: string}}) {
    const { id } = await params
    const events = await getEventById(id)
    if (!events) {
        notFound()
    }
    return (
        <>
            <h1>イベント詳細</h1>
            <h2>{events.title}</h2>
            <div className={getCategoryColor(events.category) ?? "bg-gray-100"}>
                <p>{events.category}</p>
            </div>
            <p>概要: {events.description}</p>
            <p>関連作品: {events.animeTitle}</p>
            <p>場所: {events.location}</p>
            <p>開始日時: {events.eventStart}</p>
            <p>終了日時: {events.eventEnd}</p>
            <p>公開日時: {events.publishedAt}</p>
            <CountdownBadge eventStart={events.eventStart} />
            <MapLink location={events.location}/>
        </>
    )
}
