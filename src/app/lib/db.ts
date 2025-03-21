import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = () => {
    return new PrismaClient();
}

// Ensure prisma is attached to globalThis in development to prevent multiple instances
declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? PrismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}

export default prisma;
