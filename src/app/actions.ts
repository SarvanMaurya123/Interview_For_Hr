

"use server";
import prisma from "./lib/db";
import { requiredUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema, OnBoardingSchemaValidation, settingSchema } from "./lib/zodSchema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { nylas } from "./lib/nylas";

export async function OnBoardingAction(prevState: any, formData: FormData) {
    // ✅ Ensure user is authenticated
    const session = await requiredUser();
    if (!session?.user?.id) {
        throw new Error("User is not authenticated.");
    }

    // ✅ Get the validation schema instance first
    const schema = OnBoardingSchemaValidation({
        async isUserNameUnique(userName: string) {
            const existingUserName = await prisma.user.findUnique({
                where: { userName },
            });
            return !existingUserName;
        },
    });

    // ✅ Validate form data with Zod
    const submission = await parseWithZod(formData, { schema, async: true });

    if (submission.status !== "success") {
        return submission.reply(); // Return validation errors if any
    }

    // ✅ Update user in database
    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            userName: submission.value.userName,
            name: submission.value.fullName,
            availability: {
                createMany: {
                    data: [
                        {
                            day: "Monday",
                            fromTime: "08:00",
                            tillTime: "17:00",
                        },
                        {
                            day: "Tuesday",
                            fromTime: "08:00",
                            tillTime: "17:00",
                        },
                        {
                            day: "Wednesday",
                            fromTime: "08:00",
                            tillTime: "17:00",
                        },
                        {
                            day: "Thursday",
                            fromTime: "08:00",
                            tillTime: "17:00",
                        },
                        {
                            day: "Friday",
                            fromTime: "08:00",
                            tillTime: "17:00",
                        },
                        {
                            day: "Saturday",
                            fromTime: "08:00",
                            tillTime: "17:00",
                        },
                        {
                            day: "Sunday",
                            fromTime: "08:00",
                            tillTime: "17:00",
                        }
                    ]
                }
            }
        },
    });

    // ✅ Redirect to dashboard after successful onboarding
    return redirect("/dashboard");
}


export async function SettingsAction(prevState: any, formData: FormData) {
    // ✅ Ensure user is authenticated
    const session = await requiredUser();
    const submission = parseWithZod(formData, {
        schema: settingSchema
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const user = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            name: submission.value.fullName,
            image: submission.value.profileImage,
        },

    });
    return redirect("/dashboard");
}



export async function UpdateAvailabilityAction(formData: FormData) {
    // ✅ Ensure user is authenticated
    const session = await requiredUser();

    const rawData = Object.fromEntries(formData.entries());

    // ✅ Corrected Filtering & Mapping
    const availability = Object.keys(rawData)
        .filter((key) => key.startsWith("id-")) // ✅ Return inside filter
        .map((key) => {
            const id = key.replace("id-", "");
            return {
                id,
                isActive: rawData[`isActive-${id}`] === "on",
                fromTime: rawData[`fromTime-${id}`] as string || null,
                tillTime: rawData[`tillTime-${id}`] as string || null,
            };
        });

    try {
        await prisma.$transaction(
            availability.map((item) =>
                prisma.availability.update({
                    where: { id: item.id },
                    data: {
                        isActive: item.isActive,
                        fromTime: item.fromTime as string,
                        tillTime: item.tillTime as string,
                    },
                })
            )
        );

        revalidatePath("/dashboard/availability"); // ✅ Correctly revalidate page
        console.log("Availability updated successfully!");
    } catch (error) {
        console.error("Error updating availability:", error);
    }
}



export async function CreateEventTypeAction(prevState: any, formData: FormData) {
    // Ensure user is authenticated
    const session = await requiredUser();

    const submission = parseWithZod(formData, {
        schema: eventTypeSchema
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.eventType.create({
        data: {
            title: submission.value.title,
            description: submission.value.description,
            duration: Number(submission.value.duration),
            url: submission.value.url,
            videoCallSoftwere: submission.value.videoCallSofterer,
            userId: session.user?.id
        }
    });
    return redirect("/dashboard")

}


// export async function CreateMeetingAction(formData: FormData) {
//     const getUserData = await prisma.user.findUnique({
//         where: {
//             userName: formData.get("username") as string
//         },
//         select: {
//             grantEmail: true,
//             grantId: true
//         }
//     })

//     if (!getUserData) {
//         throw new Error("User Name Found!")
//     }

//     const eventTypeData = await prisma.eventType.findUnique({
//         where: {
//             id: formData.get("eventTypeId") as string,

//         },
//         select: {
//             title: true,
//             description: true
//         }
//     })

//     const fromTime = formData.get("fromTime") as string
//     const eventData = formData.get("eventDate") as string

//     const meetingLength = Number(formData.get('meetingLength'))

//     const provider = formData.get('provider') as string

//     const startDateTime = new Date(`${eventData}T${fromTime}:00`)

//     const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000)

//     // Debug logs
//     console.log("Start DateTime:", startDateTime);
//     console.log("End DateTime:", endDateTime);
//     console.log("Start Time (Unix):", Math.floor(startDateTime.getTime() / 1000));
//     console.log("End Time (Unix):", Math.floor(endDateTime.getTime() / 1000));




//     // Create the event in Nylas
//     await nylas.events.create({
//         identifier: getUserData.grantId as string,
//         requestBody: {
//             title: eventTypeData?.title,
//             description: eventTypeData?.description,
//             when: {
//                 startTime: Math.floor(startDateTime.getTime() / 1000),
//                 endTime: Math.floor(endDateTime.getTime() / 1000),
//             },
//             conferencing: {
//                 autocreate: {},
//                 provider: provider as any,
//             },
//             participants: [
//                 {
//                     name: formData.get('name') as string,
//                     email: formData.get('email') as string,
//                     status: "yes",// "yes" or "no"
//                 }
//             ]
//         },
//         queryParams: {
//             calendarId: getUserData.grantEmail as string,
//             notifyParticipants: true,

//         }
//     });

//     return redirect("/sucess")
// }


export async function CreateMeetingAction(formData: FormData) {
    const getUserData = await prisma.user.findUnique({
        where: {
            userName: formData.get("username") as string
        },
        select: {
            grantEmail: true,
            grantId: true
        }
    });

    if (!getUserData) {
        throw new Error("User Name Not Found!");
    }

    const eventTypeData = await prisma.eventType.findUnique({
        where: {
            id: formData.get("eventTypeId") as string,
        },
        select: {
            title: true,
            description: true
        }
    });

    if (!eventTypeData) {
        throw new Error("Event Type Not Found!");
    }

    const eventData = (formData.get("eventDate") as string)?.trim();
    const fromTime = (formData.get("fromTime") as string)?.trim();
    const meetingLength = Number(formData.get("meetingLength"));
    const provider = formData.get("provider") as string;

    // // 🔹 Log values before using them
    // console.log("Raw eventDate:", eventData);
    // console.log("Raw fromTime:", fromTime);

    // Validate date & time format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(eventData) || !/^\d{2}:\d{2}$/.test(fromTime)) {
        throw new Error("Invalid eventDate or fromTime format. Expected 'YYYY-MM-DD' and 'HH:mm'.");
    }

    // 🔹 Safely create Date objects
    const startDateTime = new Date(`${eventData}T${fromTime}:00`);
    if (isNaN(startDateTime.getTime())) {
        throw new Error("Invalid startDateTime. Check eventDate and fromTime.");
    }

    const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000);
    if (isNaN(endDateTime.getTime())) {
        throw new Error("Invalid endDateTime.");
    }

    // // 🔹 Debug logs
    // console.log("Fixed Start DateTime:", startDateTime);
    // console.log("Fixed End DateTime:", endDateTime);
    // console.log("Start Time (Unix):", Math.floor(startDateTime.getTime() / 1000));
    // console.log("End Time (Unix):", Math.floor(endDateTime.getTime() / 1000));

    // ✅ Corrected Nylas Event Creation
    await nylas.events.create({
        identifier: getUserData.grantId as string,
        requestBody: {
            title: eventTypeData.title,
            description: eventTypeData.description,

            when: {
                startTime: Math.floor(startDateTime.getTime() / 1000), // ✅ Fixed property
                endTime: Math.floor(endDateTime.getTime() / 1000), // ✅ Fixed property
            },
            conferencing: {
                autocreate: {},
                provider: provider as any,
            },
            participants: [
                {
                    name: formData.get("name") as string,
                    email: formData.get("email") as string,
                    status: "yes", // "yes" or "no"
                }
            ],
        },
        queryParams: {
            calendarId: getUserData.grantEmail as string,
            notifyParticipants: true,
        }
    });

    return redirect("/success");
}


export async function cancelMeetingAction(formData: FormData) {
    const session = await requiredUser()
    const userData = await prisma.user.findUnique({
        where: {
            id: session.user?.id
        },
        select: {
            grantId: true,
            grantEmail: true
        }
    });

    if (!userData) {
        throw new Error("User Not Founds");
    }

    const data = await nylas.events.destroy({
        eventId: formData.get("eventId") as string,
        identifier: userData.grantId as string,
        queryParams: {
            calendarId: userData.grantEmail as string
        }
    })

    revalidatePath("/dashboard/meetings")
}

export default async function DeleteEventAction(eventId: string) {

    const session = await requiredUser()
    const userData = await prisma.eventType.delete({
        where: {
            id: eventId
        },
    })
    if (!userData) {
        throw new Error("Event Not Found");
    }

    return redirect("/dashboard");

}