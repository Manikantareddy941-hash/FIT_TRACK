"use client";

import { motion } from "framer-motion";
import { Home, Trophy, BarChart2, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "workouts", label: "Workouts", icon: Trophy, path: "/workout" },
  { id: "stats", label: "Analysis", icon: BarChart2, path: "/stats" },
  { id: "activity", label: "Registry", icon: Search, path: "/activity" },
  { id: "profile", label: "Profile", icon: User, path: "/settings" },
];

export function NavDock() {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ derive active tab instead of storing state
  const activeTab =
    navItems.find((item) => item.path === pathname)?.id ?? "home";

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-lg pointer-events-none">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-4k rounded-[2.5rem] p-2 flex items-center justify-between gap-1 pointer-events-auto shadow-2xl"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "relative flex flex-col items-center justify-center py-3 px-5 rounded-2xl transition-all duration-500 group",
                isActive
                  ? "text-foreground"
                  : "text-foreground/40 hover:text-foreground/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/5 rounded-2xl border border-black/5"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-500",
                  isActive
                    ? "scale-110 mb-1 text-primary"
                    : "group-hover:scale-110"
                )}
              />

              {isActive && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold uppercase tracking-widest leading-none text-foreground/90"
                >
                  {item.label}
                </motion.span>
              )}

              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)]"
                />
              )}
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
