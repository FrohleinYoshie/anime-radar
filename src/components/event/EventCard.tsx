import type { AnimeEvent } from "@/types";
import { getCategoryColor } from "@/lib/category";
import Link from "next/link";

export default function EventCard({event}: {event: AnimeEvent}) {
    return (
        <>
        <Link href={`/events/${event.id}`}>
            <div>
                <h2>{event.title}</h2>
                <div className={getCategoryColor(event.category) ?? "bg-gray-100"}>
                    <p>{event.category}</p>
                </div>
                <p>{event.animeTitle}</p>
                <p>{event.location}</p>
                <p>{event.publishedAt}</p>
            </div>
        </Link>
        </>
    )
}