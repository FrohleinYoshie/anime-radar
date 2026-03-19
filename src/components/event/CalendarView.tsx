"use client"
import { useState } from "react"
import type { AnimeEvent } from "@/types"

export default function CalendarView({ events }: {events: AnimeEvent[]}){
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const week = ["日", "月", "火", "水", "木", "金", "土"]

    const handlePlusMonth = () => {
        if (0 <= currentMonth && currentMonth < 11) {
            setCurrentMonth(currentMonth + 1)
        } else if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        }
    }

    const handleMinusMonth = () => {
        if (0 < currentMonth && currentMonth <= 11) {
            setCurrentMonth(currentMonth - 1)
        } else if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        }
    }

    const getDayOfWeek = (currentYear: number, currentMonth: number) => {
        return new Date(currentYear, currentMonth, 1).getDay()
    }

    const daysInMonth = (currentYear: number, currentMonth: number) => {
        return new Date(currentYear, currentMonth + 1, 0).getDate()
    }

    const getCalendar = (i: number) => {
        const days = i+1-getDayOfWeek(currentYear, currentMonth)
        {/**0以下の場合は先頭の空いているマスに先月の日付を表示する */}
        if (days <= 0) {
            const followingMonthDays = daysInMonth(currentYear, currentMonth-1)
            return followingMonthDays + days
        }
        {/**表示月の最終日以降は末尾の空いているマスに翌月の1日を表示する */}
        if (days > daysInMonth(currentYear, currentMonth)) {
            return days - daysInMonth(currentYear, currentMonth)
        }
        return days
    }

    const calendarLength = () => {
        if ((daysInMonth(currentYear, currentMonth )+getDayOfWeek(currentYear, currentMonth)) % 7 === 0) {
            return daysInMonth(currentYear, currentMonth )+getDayOfWeek(currentYear, currentMonth)
        } else {
            return daysInMonth(currentYear, currentMonth )+getDayOfWeek(currentYear, currentMonth)+(7 - ((daysInMonth(currentYear, currentMonth )+getDayOfWeek(currentYear, currentMonth)) % 7))
        }
    }

    return (
        <>
            {/*年を表示*/}
            <div>
                <h2>{currentYear}</h2>
                <button onClick={() => setCurrentYear(currentYear-1)}>前年へ</button>
                <button onClick={() => setCurrentYear(currentYear+1)}>次の年へ</button>
            </div>
            {/*月を表示*/}
            <div>
                {currentMonth+1}
                <button onClick={handleMinusMonth}>先月へ</button>
                <button onClick={handlePlusMonth}>次の月へ</button>
            </div>
            {/** カレンダー表。上から日曜から土曜まで。その下から日付が入る */}
            <div className="grid grid-cols-7">
                {week.map((w) => (
                    <p key={w}>{w}</p>
                ))}
                {Array.from({ length: calendarLength()}).map((_, i) => (
                    <div key={i}>
                        <p>{getCalendar(i)}</p>
                    <p>{events.filter((event) => {if (!event.eventStart) return false; else return new Date(event.eventStart).getFullYear() === currentYear && new Date(event.eventStart).getMonth() === currentMonth && new Date(event.eventStart).getDate() === getCalendar(i) && 1 <= getCalendar(i) && getCalendar(i) <= daysInMonth(currentYear, currentMonth)}).map((event) => event.title)}</p>
                    </div>
                ))}
            </div>
            <div>
                
            </div>
        </>
    )
}
