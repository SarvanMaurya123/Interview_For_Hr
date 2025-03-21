"use client"
import { useEffect, useState } from "react";
import { Calendars } from "./Calender";
import { today, getLocalTimeZone, DateValue, parseDate, CalendarDate } from "@internationalized/date";
import { useRouter, useSearchParams } from "next/navigation";

interface iAppProps {
    availability: {
        day: string;
        isActive: boolean;
    }[];
}

export function RenderCalender({ availability }: iAppProps) {
    const searchParam = useSearchParams();
    const router = useRouter()

    const [date, setDate] = useState<CalendarDate>(() => {
        const dateParam = searchParam.get("date");
        return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
    });


    useEffect(() => {
        const dateParam = searchParam.get("date");
        if (dateParam) {
            setDate(parseDate(dateParam));
        }
    }, [])

    const handleDateChange = (data: DateValue) => {
        setDate(date as CalendarDate);

        const url = new URL(window.location.href);
        url.searchParams.set("date", data.toString());
        router.push(url.toString());
    };

    const isDateUnavailable = (data: DateValue) => {
        const dayOfWeek = data.toDate(getLocalTimeZone()).getDay();
        const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        if (!availability || availability.length < 7) return true; // Default to unavailable if no data

        return !availability[adjustedIndex]?.isActive;
    };

    return (
        <>
            <Calendars
                minValue={today(getLocalTimeZone())}
                isDateUnavailable={isDateUnavailable}
                focusedValue={date}
                onFocusChange={handleDateChange}
            />
        </>
    );
}
