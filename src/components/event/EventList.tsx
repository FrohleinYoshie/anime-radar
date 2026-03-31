import type { AnimeEvent } from "@/types"
import EventCard from "./EventCard"

export default function EventList({events}: {events: AnimeEvent[]}) {
    return (
        <>
        {events.length === 0 ? (
            <p>関連イベントはありません</p>
        ) : (
            events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))
        )}
        </>
    )
}