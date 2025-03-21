import EditEventForm from "@/app/components/EditEventTypeForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

async function getData(eventTypeId: string) {
    if (!eventTypeId) return notFound();

    const data = await prisma.eventType.findUnique({
        where: { id: eventTypeId },
        select: {
            title: true,
            description: true,
            duration: true,
            url: true,
            id: true,
            videoCallSoftwere: true,
        },
    });

    if (!data) return notFound();
    return data;
}

export default async function EditRoute({ params }: { params: { eventTypeId: string } }) {
    const { eventTypeId } = await params;
    if (!eventTypeId) return notFound();

    const data = await getData(eventTypeId);
    if (!data) return notFound();

    const formattedData = {
        ...data,
        videoCallSoftwere: data.videoCallSoftwere as VideoCallProvider, // ✅ Fix: Typecasting
    };

    return <EditEventForm eventData={formattedData} />;
}
