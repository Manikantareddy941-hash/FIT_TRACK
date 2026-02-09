"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Activity, BarChart3, Settings, Dumbbell } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-16 -translate-x-full flex-col border-r bg-background transition-transform md:translate-x-0 md:w-64 lg:flex">
            <div className="flex h-16 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Activity className="h-6 w-6" />
                    <span className="hidden md:block">FitTrack</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-2 p-2">
                <NavItem href="/" icon={<LayoutDashboard />} label="Dashboard" active={pathname === "/"} />
                <NavItem href="/workout" icon={<Dumbbell />} label="Workout" active={pathname === "/workout"} />
                <NavItem href="/activity" icon={<Activity />} label="Activity Log" active={pathname === "/activity"} />
                <NavItem href="/stats" icon={<BarChart3 />} label="Statistics" active={pathname === "/stats"} />
                <NavItem href="/settings" icon={<Settings />} label="Settings" active={pathname === "/settings"} />
            </nav>
        </aside>
    );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
        >
            <span className="h-5 w-5">{icon}</span>
            <span className="hidden md:block font-medium">{label}</span>
        </Link>
    );
}
