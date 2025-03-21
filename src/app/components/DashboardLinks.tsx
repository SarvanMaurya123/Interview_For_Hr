import { CalendarCheck, HomeIcon, Settings, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface iAppProps {
    id: number;
    name: string;
    href: string;
    icon: React.ElementType;
}
// DashBoard Navigation 
export const dashboardLinks: iAppProps[] = [
    {
        id: 0,
        name: "Event Types",
        href: "/dashboard",
        icon: HomeIcon,
    },
    {
        id: 1,
        name: "Meetings",
        href: "/dashboard/meetings",
        icon: User2,
    },
    {
        id: 2,
        name: "Availability",
        href: "/dashboard/availability",
        icon: CalendarCheck,
    },
    {
        id: 3,
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function DashboardLinks() {
    const pathname = usePathname()
    return (
        <>
            <ul className="space-y-3">
                {dashboardLinks.map((link) => (
                    <li key={link.id}>
                        <Link
                            href={link.href}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${pathname === link.href
                                ? "bg-pink-500 text-white shadow-md"
                                : "text-pink-700 hover:bg-pink-300 hover:text-white"
                                }`}
                        >
                            <link.icon className="size-5" />
                            <span className="font-bold">{link.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
