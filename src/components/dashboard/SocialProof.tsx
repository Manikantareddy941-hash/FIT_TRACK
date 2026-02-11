"use client";

import { useFitnessStore } from "@/store/fitness-store";
import { Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SocialProof() {
    const socialCount = useFitnessStore((state) => state.progress?.socialCount ?? 1420);
    const updateSocialCount = useFitnessStore((state) => state.updateSocialCount);
    const [displayCount, setDisplayCount] = useState<number>(socialCount);

    useEffect(() => {
        const interval = setInterval(() => {
            updateSocialCount();
        }, 15000 + Math.random() * 30000);

        return () => clearInterval(interval);
    }, [updateSocialCount]);

    useEffect(() => {
        setDisplayCount(socialCount);
    }, [socialCount]);

    return (
        <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl glass-4k border-black/5 shadow-premium self-start relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex -space-x-3 relative z-10">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br from-black/10 to-black/5 overflow-hidden ring-1 ring-black/5"
                    >
                        <img
                            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${i + 500}`}
                            alt="Warrior"
                            className="w-full h-full object-cover p-1 opacity-80"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest relative z-10">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-accent/10 text-accent border border-accent/20">
                    <Zap className="h-3 w-3 fill-current animate-pulse" />
                    <span>Live</span>
                </div>
                <div className="h-4 w-px bg-black/10 mx-1" />
                <span className="text-foreground">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={displayCount}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-primary inline-block mr-1"
                        >
                            {displayCount.toLocaleString()}
                        </motion.span>
                    </AnimatePresence>
                    Active Warriors
                </span>
            </div>
        </div>
    );
}
