'use server'
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

export async function getAvailability(userId: string) {
    const data = await prisma?.availability.findMany({
        where: { userId },
    });

    if (!data || data.length === 0) {
        return notFound();
    }

    return data;
}
