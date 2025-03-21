import { Button } from "@/components/ui/button";
import { BanIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

interface isAppProps {
    title: string;
    description: string;
    buttonText: string;
    href: string;
}
export default function EmptyStateData({ buttonText, title, description, href }: isAppProps) {

    return (<>
        <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600/15">
                <BanIcon className="text-pink-400" size={40} />
            </div>
            <h2 className="mt-6 text-xl font-semibold">{title}</h2>
            <p className="mb-8 mt-2.5 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
            <Button asChild>
                <Link href={href} className="flex items-center">
                    <PlusCircle className=" size-4" />
                    {buttonText}
                </Link>
            </Button>
        </div>
    </>)

}