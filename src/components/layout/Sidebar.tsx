"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Activity,
    BarChart3,
    Settings,
    Dumbbell,
    Flame,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-16 -translate-x-full md:translate-x-0 md:w-64 glass-4k border-r border-white/5 transition-all duration-500 ease-in-out">
            <div className="flex h-20 items-center px-6 mb-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-500 blur-lg opacity-40 group-hover:opacity-80 transition-opacity" />
                        <Zap className="h-8 w-8 text-white relative fill-purple-500" />
                    </div>
                    <span className="hidden md:block font-black italic text-2xl tracking-tighter uppercase text-white ml-1">
                        Fit<span className="text-purple-500">Track</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 space-y-1 px-3">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-4 mb-3">Protocol</div>
                <NavItem href="/" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" active={pathname === "/"} />
                <NavItem href="/workout" icon={<Dumbbell className="h-5 w-5" />} label="Training" active={pathname === "/workout"} />

                <div className="pt-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-4 mb-3">Analytics</div>
                    <NavItem href="/activity" icon={<Activity className="h-5 w-5" />} label="Neuro-Log" active={pathname === "/activity"} />
                    <NavItem href="/stats" icon={<BarChart3 className="h-5 w-5" />} label="Bio-Metrics" active={pathname === "/stats"} />
                </div>

                <div className="pt-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-4 mb-3">Access</div>
                    <NavItem href="/settings" icon={<Settings className="h-5 w-5" />} label="Parameters" active={pathname === "/settings"} />
                </div>
            </nav>

            <div className="p-4 mt-auto">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-purple-400">Sync Status</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-purple-500"
                            initial={{ width: "20%" }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 group ${active
                ? "bg-white/10 text-white shadow-premium border border-white/5"
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
        >
            <span className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-purple-400' : ''}`}>
                {icon}
            </span>
            <span className="hidden md:block text-xs font-bold uppercase tracking-widest">{label}</span>
            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#7B5CFF]"
                />
            )}
        </Link>
    );
}
