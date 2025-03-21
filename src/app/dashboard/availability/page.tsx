import { UpdateAvailabilityAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { requiredUser } from "@/app/lib/hooks";
import { times } from "@/app/lib/Times";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";

async function getData(userId: string) {
    const data = await prisma?.availability.findMany({
        where: {
            userId: userId,
        },
    });
    if (!data) {
        return notFound();
    }

    return data;
}

export default async function AvailabilityRouter() {
    const session = await requiredUser();
    const data = await getData(session.user?.id as string);

    // Define sorting order (Monday first, followed by other days)
    const dayOrder: Record<string, number> = {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4,
        Saturday: 5,
        Sunday: 6,
    };

    // Sort data based on the day order
    const sortedData = [...data].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl text-center">Availability</CardTitle>
                <CardDescription>This section allows you to manage your availability</CardDescription>
            </CardHeader>
            <form action={UpdateAvailabilityAction}>
                <CardContent className="flex flex-col gap-y-6">
                    {sortedData.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-6 p-4 border rounded-lg shadow-sm"
                        >
                            {/* Switch and Day Label */}
                            <input type="hidden" name={`id-${item.id}`} value={item.id} />
                            <div className="flex items-center gap-x-4">
                                <Switch name={`isActive-${item.id}`} defaultChecked={item.isActive} />
                                <span className="text-md font-medium text-gray-700 font-bold">
                                    {item.day}
                                </span>
                            </div>

                            {/* From Time Dropdown */}
                            <Select defaultValue={item.fromTime} name={`fromTime-${item.id}`}>
                                <SelectTrigger className="w-full border rounded-lg px-3 py-2 shadow-sm">
                                    <SelectValue placeholder="Start Time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {times.map((time, i) => (
                                            <SelectItem key={i} value={time.time}>{time.time}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {/* Till Time Dropdown */}
                            <Select defaultValue={item.tillTime} name={`tillTime-${item.id}`}>
                                <SelectTrigger className="w-full border rounded-lg px-3 py-2 shadow-sm">
                                    <SelectValue placeholder="End Time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {times.map((time, i) => (
                                            <SelectItem key={i} value={time.time}>{time.time}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </CardContent>

                <SubmitButton text="Save Changes" className="w-fit ml-6 mt-5 w-md" />
            </form>
        </Card>
    );
}
