import { cancelMeetingAction } from "@/app/actions";
import EmptyStateData from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { requiredUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";
import Link from "next/link";

async function getData(userId: string) {
    const userData = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            grantId: true,
            grantEmail: true
        }
    });

    if (!userData) {
        throw new Error("User Not Found");
    }

    const data = await nylas.events.list({
        identifier: userData.grantId as string,
        queryParams: {
            calendarId: userData.grantEmail as string
        },
    });

    return data;
}

export default async function Meetings() {
    const session = await requiredUser();
    const data = await getData(session.user?.id as string);

    return (
        <div className="h-screen  p-6 overflow-x-hidden">
            {data.data.length < 1 ? (
                <EmptyStateData
                    title="No Meetings Found"
                    description="You don't have any meetings yet."
                    buttonText="Create New Meeting"
                    href="/dashboard/new"
                />
            ) : (
                <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
                    {data.data.map((item) => (
                        <form action={cancelMeetingAction}>
                            <input type="hidden" name="eventId" value={item.id} />
                            <Card key={item.id} className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6">
                                    <CardTitle className="text-3xl font-bold text-center">{item.title}</CardTitle>
                                    <CardDescription className="flex justify-between">
                                        <p className="text-sm px-3 py-1 bg-white/20 backdrop-blur-md rounded-full shadow-md">
                                            {format(fromUnixTime(item.when.startTime), "EEE, dd MMM yyyy")}
                                        </p>
                                        <p className="text-sm px-3 py-1 bg-white/20 backdrop-blur-md rounded-full shadow-md">
                                            {format(fromUnixTime(item.when.startTime), "hh:mm a")} - {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-5 text-white space-y-4">
                                    <div className="flex justify-center items-center gap-3 bg-white/20 p-3 rounded-lg shadow-md hover:bg-white/30 transition">
                                        <Video className="size-7 text-white" />
                                        <a href={item.conferencing.details.url} className="text-sm font-semibold underline underline-offset-4 hover:text-blue-300 transition">
                                            Join Meeting
                                        </a>
                                    </div>
                                    <p className="text-center text-lg">{item.participants[0].name}</p>
                                    <SubmitButton text="Cancel Meeting" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md transition" />
                                </CardContent>
                            </Card>
                        </form>
                    ))}
                </div>


            )}
        </div>
    );
}