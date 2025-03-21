
import { notFound } from "next/navigation"
import { requiredUser } from "../lib/hooks"
import EmptyStateData from "../components/EmptyState"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Link2, Pen, Settings, Trash, User2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CopyLinkMenuItem from "../components/BookingForm/copyLinkMenu"
import DeleteEvent from "../components/DeleteEvent"

async function getData(userId: string) {
    const data = await prisma?.user?.findUnique({
        where: {
            id: userId,
        },
        select: {
            userName: true,
            eventType: {
                select: {
                    id: true,
                    active: true,
                    title: true,
                    url: true,
                    duration: true
                }

            }
        }
    })
    if (!data) {
        return notFound()
    }
    return data
}

export default async function DashBoard() {
    const session = await requiredUser()
    const data = await getData(session.user?.id as string)

    return (
        <>
            {
                data.eventType.length === 0 ? (
                    <EmptyStateData
                        title="You ahve not Event"
                        description="You have not created any event yet clicking the button below to create one"
                        buttonText="Create Event"
                        href="/dashboard/new"
                    />
                ) : (
                    <>
                        <div className="flex items-center justify-between p-3">

                            <div className="hidden sm:grid gap-y-2">
                                <h1 className="text-3xl md:text-4xl font-semibold">Event Types</h1>
                                <p className="text-gray-400">Create and manage your event right here.</p>
                            </div>
                            <Button asChild>
                                <Link href={`/dashboard/new`}>
                                    Create New Event
                                </Link>
                            </Button>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">

                            {data.eventType.map((itme) => (
                                <div key={itme.id} className="overflow-hidden shadow rounded-lg border relative">
                                    <div className="absolute top-2 right-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button>
                                                    <Settings size={40} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Event</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/${data.userName}/${itme.url}`}>
                                                            <ExternalLink className="mr-3 size-5" />
                                                            Previews</Link>
                                                    </DropdownMenuItem>
                                                    <CopyLinkMenuItem
                                                        meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${itme.url}`}
                                                    />
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/event/${itme.id}`}>
                                                            <Pen className="size-4 mr-2" /> Edit
                                                        </Link>
                                                    </DropdownMenuItem>

                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator />
                                                <DeleteEvent eventId={itme.id} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <Link href={`/`} className="flex items-center justify-between p-3">
                                        <div className="flex-shrink-0">
                                            <User2 className="size-6" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">{itme.duration} minutes Meeting</dt>
                                                <dd className="text-lg text-gray-500 truncate">{itme.title}</dd>
                                            </dl>
                                        </div>
                                    </Link>
                                    <div className="bg-muted px-5 py-3 flex justify-between items-center">
                                        <Switch className="bg-gray-300 border border-pink-400" />

                                        <Button className="cursor-pointer">
                                            <Link href={`/dashboard/event/${itme.id}`}>
                                            </Link>
                                            Edit Now
                                        </Button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </>
    )
}