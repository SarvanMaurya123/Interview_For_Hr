// /app/api/user.ts
'use server'
import { requiredUser } from "../lib/hooks";
import prisma from "../lib/db";

export async function getUserData() {
    const session = await requiredUser();
    if (!session?.user?.id) return null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            userName: true,
            grantId: true,
            image: true
        },
    });

    return user;
}
