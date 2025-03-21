import { requiredUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const session = await requiredUser();

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return Response.json("Hey, you need to login to access this page", { status: 401 });
    }

    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret: nylasConfig.apiKey,
            clientId: nylasConfig.clientId!,
            redirectUri: nylasConfig.rediractUri,
            code: code
        });


        const { grantId, email } = response;

        await prisma?.user.update({
            where: {
                id: session.user?.id
            },
            data: {
                grantId: grantId,
                grantEmail: email,
            },
        });

    } catch (error) {
        throw new Error("Error exchanging code for token");
    }
    redirect("/dashboard")
}