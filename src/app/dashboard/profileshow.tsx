"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getUserData } from "./getdata";

export function ProfileDropdown() {
    const [user, setUser] = useState<{ userName?: string; image?: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserData();
            setUser({
                userName: data?.userName ?? undefined,
                image: data?.image ?? undefined
            });
        }
        fetchUser();
    }, []);


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" variant="secondary" className="rounded-full">
                    <img
                        src={user?.image || "https://via.placeholder.com/100x100"}
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
        </DropdownMenu>
    );
}
