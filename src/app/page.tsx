import EventList from "@/components/event/EventList";
import { getRecentEvents } from "@/lib/db";
import CalendarView from "@/components/event/CalendarView";

export default async function Home() {
  const events = await getRecentEvents(10)
  return (
    <>
    { events && events.length > 0 ?
        <EventList events={events} /> :
        <p>イベントが見つかりませんでした</p>
    }
    <CalendarView events={events} />
    </>
  );
}
