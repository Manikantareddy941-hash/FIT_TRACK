"use client";

import { useFitnessStore } from "@/store/fitness-store";
import { motion } from "framer-motion";
import { Sparkles, Sun, Moon, Sunrise, Coffee } from "lucide-react";

export const Greeting = () => {
    const userProfile = useFitnessStore((state) => state.userProfile);

    const hour = new Date().getHours();

    let greeting = "Hello";
    let icon = <Sparkles className="h-4 w-4" />;

    if (hour < 12) {
        greeting = "Good morning";
        icon = <Sunrise className="h-4 w-4 text-orange-400" />;
    } else if (hour < 17) {
        greeting = "Good afternoon";
        icon = <Sun className="h-4 w-4 text-yellow-400" />;
    } else if (hour < 21) {
        greeting = "Good evening";
        icon = <Coffee className="h-4 w-4 text-brown-400" />;
    } else {
        greeting = "Good night";
        icon = <Moon className="h-4 w-4 text-indigo-400" />;
    }

    const firstName = userProfile?.name?.split(" ")[0] || "Champion";

    return (
        <div className="space-y-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
            >
                <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-4k shadow-none border-fine">
                    {icon}
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                        {greeting}
                    </span>
                </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none group">
                Welcome Back, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x transition-all duration-500">
                    {firstName}
                </span>
            </h1>
        </div>
    );
};
