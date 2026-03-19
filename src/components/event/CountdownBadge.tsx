export default function CountdownBadge({eventStart}: {eventStart: string | null}) {
    if (!eventStart) return null
    else {
        const eventStartDay = new Date(eventStart)
        const today = new Date()
        const startRestDays = eventStartDay.getTime() - today.getTime()
        const restDays = Math.ceil(startRestDays / (1000 * 60 * 60 * 24))

        if (restDays > 0) {
            return <span>開始まであと {restDays} 日</span>
        } else {
            return <span>終了</span>
        }
    }
}