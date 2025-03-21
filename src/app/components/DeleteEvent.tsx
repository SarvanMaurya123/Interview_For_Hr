"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import DeleteEventAction from "../actions";
import { toast } from "sonner";

export default function DeleteEvent({ eventId }: { eventId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        toast(
            "Are you sure you want to delete this event?",
            {
                action: {
                    label: "Delete",
                    onClick: () => {
                        startTransition(async () => {
                            toast.promise(
                                DeleteEventAction(eventId),
                                {
                                    loading: "Deleting event...",
                                    success: "Event deleted successfully!",
                                    error: "Failed to delete event. Please try again.",
                                }
                            );
                        });
                    },
                },
            }
        );
    };

    return (
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-500">
            <Trash className="mr-2" />
            {isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
    );
}
