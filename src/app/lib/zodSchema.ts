

import { z } from "zod";

export const OnBoardingSchema = z.object({
    fullName: z.string().min(3, { message: "Full Name must be at least 3 characters long" }).max(150),
    userName: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(150, { message: "Username must not exceed 150 characters" })
        .regex(/^[a-zA-Z0-9-]+$/, {
            message: "Username should only contain letters, numbers, and dashes (-)",
        }),
});

// ✅ Fixed Async Validation Schema
export function OnBoardingSchemaValidation(options?: {
    isUserNameUnique: (userName: string) => Promise<boolean>;
}) {
    return z.object({
        userName: z.string()
            .min(3, { message: "Username must be at least 3 characters long" })
            .max(150, { message: "Username must not exceed 150 characters" })
            .regex(/^[a-zA-Z0-9-]+$/, {
                message: "Username should only contain letters, numbers, and dashes (-)",
            })
            .refine(async (userName) => {
                if (!options?.isUserNameUnique) return false;
                return await options.isUserNameUnique(userName);
            }, {
                message: "Username is already taken",
            }),
        fullName: z.string().min(3, { message: "Full Name must be at least 3 characters long" }).max(150),
    });
}

export const settingSchema = z.object({
    fullName: z.string().min(3, { message: "Name must be at least 3 characters" }).max(150),
    profileImage: z.string()

})


export const eventTypeSchema = z.object({
    title: z.string().min(3).max(100),
    duration: z.string().min(0).max(60),
    description: z.string().min(3).max(1000),
    url: z.string().min(3).max(150),
    videoCallSofterer: z.string().min(3)
})
