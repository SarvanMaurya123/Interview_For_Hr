import { SeetingsForm } from "@/app/components/SettingForm";
import { requiredUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";

async function getSettings(id: string) {
    const data = await prisma?.user.findUnique({
        where: {
            id: id,
        },
        select: {
            name: true,
            email: true,
            image: true,
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}



export default async function SettingRoute() {
    const session = await requiredUser()
    const data = await getSettings(session.user?.id as string);

    return (<>
        <div>
            < SeetingsForm
                email={data.email}
                fullName={data.name as string}
                profileImage={data.image as string}
            />
        </div>
    </>)
}
