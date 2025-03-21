import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

export default function OnboardingRouter() {
    return (<>
        <div className="min-h-screen w-screen flex items-center justify-center text-center">
            <Card >
                <CardHeader>
                    <CardTitle className="text-pink-600 text-4xl">&#60;SM/&#62;</CardTitle>
                </CardHeader>
                <CardDescription >
                    We Have connect You card Here
                </CardDescription>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth">
                            <CalendarCheck2 className="size-4 mr-1" />
                            Connect Calender on Your Account
                        </Link>
                    </Button>
                </CardContent>
            </Card>


        </div>
    </>)
}