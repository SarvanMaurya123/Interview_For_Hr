"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

export default function CopyLinkMenuItem({ meetingUrl }: { meetingUrl: string }) {

    const handelCopy = async () => {
        try {
            await navigator.clipboard.writeText(meetingUrl);
            toast.success("UUL Has Been Copied");
        } catch (error) {
            console.error(error);
        }
    }

    return (<>
        <DropdownMenuItem onSelect={handelCopy}>
            <Link2 className="mr-2 size-4" />
            Copy
        </DropdownMenuItem>
    </>)
}