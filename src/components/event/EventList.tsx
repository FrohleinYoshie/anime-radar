import type { AnimeEvent } from "@/types"
import EventCard from "./EventCard"

export default function EventList({events}: {events: AnimeEvent[]}) {
    return (
        <>
        {events.map((event) => (
            <EventCard key={event.id} event={event} />
        ))}
        </>
    )
}