import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { RenderCalender } from "@/app/components/BookingForm/RenderCalendar";
import { TimeTable } from "@/app/components/BookingForm/TimeTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { CreateMeetingAction } from "@/app/actions";

async function getData(eventUrl: string, userName: string) {
    const data = await prisma?.eventType.findFirst({
        where: {
            url: eventUrl,
            User: {
                userName: userName
            },
            active: true,
        },
        select: {
            id: true,
            description: true,
            title: true,
            duration: true,
            videoCallSoftwere: true,
            User: {
                select: {
                    image: true,
                    name: true,
                    availability: {
                        select: {
                            day: true,
                            isActive: true
                        }
                    }
                }
            }
        }
    });
    if (!data) {
        return notFound();
    }
    return data;
}

export default async function BookingRoute({ params, searchParams }:
    { params: { username: string, eventUrl: string }; searchParams: { date?: string; time?: string } }) {

    const { username, eventUrl } = await params; // No need for await

    const resolvedSearchParams = await searchParams; // Await only once
    const selectedDate = resolvedSearchParams?.date
        ? new Date(resolvedSearchParams.date) // ✅ Convert string to Date
        : new Date();

    // ✅ Format selectedDate to YYYY-MM-DD for input value
    const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

    const selectedTime = resolvedSearchParams?.time
        ? resolvedSearchParams.time.padStart(5, "0") // Ensures HH:mm
        : "00:00";

    // // 🔹 Log to check if eventDate and fromTime are correctly formatted
    // console.log("✅ Sending eventDate (Frontend):", selectedDate);
    // console.log("✅ Sending fromTime (Frontend):", selectedTime);
    const data = await getData(eventUrl, username);
    if (!data) return notFound(); // Properly handling missing data

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(new Date(selectedDate)); // Format date for display

    const showForm = !!resolvedSearchParams.date && !!resolvedSearchParams.time;

    return (
        <div className="min-h-screen w-screen flex items-center justify-center p-6">
            {showForm ? (
                <Card className="max-w-[900px]">
                    <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                        {/* User Details */}
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={data.User?.image as string}
                                alt="Profile Image"
                                className="w-24 h-24 rounded-full object-cover border-4 border-pink-500 shadow-md"
                            />
                            <p className="text-lg font-semibold mt-3 text-gray-800">{data.User?.name}</p>
                            <h1 className="text-2xl font-bold mt-2 text-gray-900">{data.title}</h1>
                            <p className="text-sm text-gray-600 mt-2">{data.description}</p>

                            {/* Event Details */}
                            <div className="mt-6 space-y-3 text-left">
                                <p className="flex items-center">
                                    <CalendarX2 className="size-5 text-pink-600 mr-3" />
                                    <span className="text-sm font-medium text-gray-700">{formattedDate}</span>
                                </p>
                                <p className="flex items-center">
                                    <Clock className="size-5 text-pink-600 mr-3" />
                                    <span className="text-sm font-medium text-gray-700">{data.duration} Min</span>
                                </p>
                                <p className="flex items-center">
                                    <VideoIcon className="size-5 text-pink-600 mr-3" />
                                    <span className="text-sm font-medium text-gray-700">{data.videoCallSoftwere}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Separator orientation="vertical" className="h-full hidden md:block" />

                            <form className="w-full max-w-sm shadow-md rounded-lg p-6" action={CreateMeetingAction}>
                                <input type="hidden" name="eventDate" value={formattedSelectedDate} />
                                <input type="hidden" name="fromTime" value={selectedTime} />
                                <input type="hidden" name="meetingLength" value={data.duration} />
                                <input type="hidden" name="provider" value={data.videoCallSoftwere} />
                                <input type="hidden" name="username" value={username} />
                                <input type="hidden" name="eventTypeId" value={data.id} />


                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <Label className="text-gray-700 font-medium">Your Name</Label>
                                        <Input placeholder="Enter your name" className="mt-1 p-2 border rounded-md w-full" required name="name" />
                                    </div>
                                    <div>
                                        <Label className="text-gray-700 font-medium">Email</Label>
                                        <Input placeholder="Enter your email" className="mt-1 p-2 border rounded-md w-full" required name="email" type="email" />
                                    </div>
                                </div>
                                <SubmitButton text="Book Meeting" className="mt-5 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition" />
                            </form>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="max-w-[1300px] w-full shadow-lg rounded-xl">
                    <CardContent className="p-6 grid md:grid-cols-3 gap-6">
                        {/* User Details */}
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={data.User?.image as string}
                                alt="Profile Image"
                                className="w-24 h-24 rounded-full object-cover border-4 border-pink-500 shadow-md"
                            />
                            <p className="text-lg font-semibold mt-3 text-gray-800">{data.User?.name}</p>
                            <h1 className="text-2xl font-bold mt-2 text-gray-900">{data.title}</h1>
                            <p className="text-sm text-gray-600 mt-2">{data.description}</p>

                            {/* Event Details */}
                            <div className="mt-6 space-y-3 text-left">
                                <p className="flex items-center">
                                    <CalendarX2 className="size-5 text-pink-600 mr-3" />
                                    <span className="text-sm font-medium text-gray-700">{formattedDate}</span>
                                </p>
                                <p className="flex items-center">
                                    <Clock className="size-5 text-pink-600 mr-3" />
                                    <span className="text-sm font-medium text-gray-700">{data.duration} Min</span>
                                </p>
                                <p className="flex items-center">
                                    <VideoIcon className="size-5 text-pink-600 mr-3" />
                                    <span className="text-sm font-medium text-gray-700">{data.videoCallSoftwere}</span>
                                </p>
                            </div>
                        </div>

                        {/* Calendar Section */}
                        <div className="flex items-center justify-center">
                            <Separator orientation="vertical" className="h-full w-[2px] bg-gray-300" />
                            <div className="flex flex-col justify-center ml-3">
                                <RenderCalender availability={data.User?.availability as any} />
                            </div>
                        </div>

                        {/* Time Table Section */}
                        <div className="flex items-center justify-center">
                            <Separator orientation="vertical" className="h-full w-[2px] bg-gray-300" />
                            <TimeTable duration={data.duration} selectedDate={selectedDate} userName={username} />
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

