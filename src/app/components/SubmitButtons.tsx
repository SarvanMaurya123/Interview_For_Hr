'use client'
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface iAppProps {
    text: string;
    variant?:

    "secondary" | "link" | "outline" | "ghost" | null | undefined | "destructive"

    className?: string;
}

export function SubmitButton({ text, variant, className }: iAppProps) {
    const { pending } = useFormStatus(); // ✅ Fix: Properly destructure `pending`

    return (
        <Button
            type="submit"
            disabled={pending} // ✅ Fix: Disable only when submitting
            variant={variant || "default"}
            className={cn("w-full", className)}
        >
            {pending ? (
                <>
                    <Loader2 className="size-4 mr-2 animate-spin" /> Processing...
                </>
            ) : (
                text
            )}
        </Button>
    );
}

export function GoogleAuthButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button
                    disabled
                    className=" px-11 py-6 font-bold hover:bg-red-100 w-full"
                    variant={"outline"}>
                    <Image src={`./icons8-google.svg`} alt="google" width={30} height={30}></Image>{/* Placeholder for Google icon */}
                    Processing...
                </Button>
            ) : (
                <Button
                    className=" px-11 py-6  font-bold hover:bg-red-100 w-full border-2"
                    variant={"outline"}>
                    <Image src={`./icons8-google.svg`} alt="google" width={30} height={30}></Image>
                    Sign Up With Google
                </Button>
            )}
        </>
    );
}

export function GithubAuthButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className=" px-11 py-6  font-bold hover:bg-gray-200 w-full" variant={"outline"}>
                    <Image src={`./icons8-github-logo.svg`} alt="google" width={30}
                        height={30}></Image>
                    Processing...
                </Button>
            ) : (
                <Button className=" px-11 py-6  font-bold hover:bg-gray-200 w-full" variant={"outline"}>
                    <Image src={`./icons8-github-logo.svg`} alt="google" width={30}
                        height={30}></Image>
                    Sign Up With GitHub
                </Button>
            )}
        </>
    );
}

