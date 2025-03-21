import { nylas } from "@/app/lib/nylas";
import { Prisma } from "@prisma/client";
import {
    addMinutes,
    format,
    fromUnixTime,
    isAfter,
    isBefore,
    parse,
} from "date-fns";
import prisma from "@/app/lib/db";
import { GetFreeBusyResponse, NylasResponse } from "nylas";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IAppProps {
    selectedDate: Date;
    userName: string;
    duration: number;
}

function calculateAvailableTimetimes(
    date: string,
    dbAvailability: { fromTime?: string; tillTime?: string },
    nylasData: NylasResponse<GetFreeBusyResponse[]> | null,
    duration: number
) {
    if (!dbAvailability.fromTime || !dbAvailability.tillTime) {
        console.warn("No available time times in database.");
        return [];
    }

    const now = new Date();
    const availableFrom = parse(`${date} ${dbAvailability.fromTime}`, "yyyy-MM-dd HH:mm", new Date());
    const availableTill = parse(`${date} ${dbAvailability.tillTime}`, "yyyy-MM-dd HH:mm", new Date());

    // Extract busy times safely
    const busytimes = nylasData?.data?.flatMap((entry) =>
        "freeBusy" in entry && Array.isArray(entry.freeBusy)
            ? entry.freeBusy.map((time) => ({
                start: fromUnixTime(time.startTime),
                end: fromUnixTime(time.endTime),
            }))
            : []
    ) || [];

    // Merge overlapping busy times
    busytimes.sort((a, b) => a.start.getTime() - b.start.getTime());
    const mergedBusytimes = busytimes.reduce((acc, curr) => {
        if (acc.length === 0 || isAfter(curr.start, acc[acc.length - 1].end)) {
            acc.push(curr);
        } else {
            acc[acc.length - 1].end = curr.end;
        }
        return acc;
    }, [] as { start: Date; end: Date }[]);

    const freetimes: string[] = [];
    let currenttime = availableFrom;

    while (isBefore(currenttime, availableTill)) {
        const timeEnd = addMinutes(currenttime, duration);
        if (isAfter(currenttime, now) && !mergedBusytimes.some(({ start, end }) =>
            (isBefore(currenttime, end) && isAfter(timeEnd, start))
        )) {
            freetimes.push(format(currenttime, "HH:mm"));
        }
        currenttime = timeEnd;
    }

    return freetimes;
}


async function getData(userName: string, selectedDate: Date) {
    const formattedDate = format(selectedDate, "EEEE");

    try {
        const data = await prisma.availability.findFirst({
            where: { day: formattedDate as Prisma.EnumDayFilter, user: { userName } },
            select: {
                fromTime: true,
                tillTime: true,
                id: true,
                user: { select: { grantEmail: true, grantId: true } },
            },
        });

        if (!data?.user?.grantId || !data.user?.grantEmail) {
            console.warn(`No grantId or grantEmail found for user ${userName}`);
            return { data, nylasCalendarData: null };
        }

        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const nylasCalendarData = await nylas.calendars.getFreeBusy({
            identifier: data.user.grantId,
            requestBody: {
                startTime: Math.floor(startOfDay.getTime() / 1000),
                endTime: Math.floor(endOfDay.getTime() / 1000),
                emails: [data.user.grantEmail],
            },
        });

        return { data, nylasCalendarData };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { data: null, nylasCalendarData: null };
    }
}

export async function TimeTable({ selectedDate, userName, duration }: IAppProps) {
    const { data, nylasCalendarData } = await getData(userName, selectedDate);

    if (!data) {
        return <p>No availability found for this date.</p>;
    }

    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const dbAvailability = { fromTime: data.fromTime, tillTime: data.tillTime };
    const availabletimes = calculateAvailableTimetimes(formattedDate, dbAvailability, nylasCalendarData, duration);

    return (
        <div>
            <p className="text-base font-semibold ml-2.5">
                {format(selectedDate, "EEE")}{" "}
                <span className="text-sm text-muted-foreground">
                    {format(selectedDate, "MMM d")}
                </span>
            </p>
            <div className="mt-3 max-h-[350px] overflow-y-auto">
                {availabletimes.length > 0 ? (
                    availabletimes.map((time, index) => (
                        <Link href={`?date=${formattedDate}&time=${time}`} key={index}>
                            <Button className="w-[300px] mb-2 md:ml-20 ml-5" variant="outline">
                                {time}
                            </Button>
                        </Link>
                    ))
                ) : (
                    <p>No available times for this date.</p>
                )}
            </div>
        </div>
    );
}
