

"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Use `useRouter` instead of `redirect`
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { DashboardLinks } from "../components/DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "../components/TheamToggle";
import { getUserData } from "./getdata";
import { Toaster } from "@/components/ui/sonner";
import { ProfileDropdown } from "./profileshow";


export default function DashboardLayout({ children }: { children: ReactNode }) {
    const router = useRouter(); // ✅ Use `useRouter` for redirection
    const [user, setUser] = useState<{ userName?: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserData();// ✅ Use `getUserData` instead of `fetchUser`

            if (!data?.userName) {
                await router.push("/onboarding"); // ✅ Redirect and return early
                return;
            }

            setUser({ userName: data.userName ?? undefined });

            if (!data?.grantId) {
                await router.push("/onboarding/grand_id"); // ✅ Redirect if grantId is missing
            }
        }

        fetchUser();
    }, [router]);


    return (
        <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block border-r bg-muted/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-15 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <h1 className="text-3xl font-bold p-3.5 text-pink-400 hover:text-pink-600">
                            &#60;SM/&#62;
                        </h1>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-3 lg:px-4 max-h-screen">
                            <DashboardLinks />
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-15 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="md:hidden shrink-0" size="icon" variant="outline">
                                <Menu size={20} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 mt-12">
                                <DashboardLinks />
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="ml-auto flex items-center gap-x-4">
                        <ThemeToggle />
                        {/*<DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button size="icon" variant="secondary" className="rounded-full">
                                    <img
                                        src={session?.user?.image || "https://via.placeholder.com/100x100"}
                                        alt="user"
                                        width={22}
                                        height={22}
                                        className="rounded-full w-full h-full"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{user?.userName || "My Account"}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/setting">Setting</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                        <ProfileDropdown />
                    </div>


                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
                <Toaster richColors closeButton />
            </div>

        </div>
    );

}
