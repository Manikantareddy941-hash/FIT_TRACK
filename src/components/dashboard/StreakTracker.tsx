"use client";

import { useFitnessStore } from "@/store/fitness-store";
import { Flame, Trophy, Zap, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function StreakTracker() {
    const progress = useFitnessStore((state) => state.progress);
    const streakLevel = Math.min(Math.floor(progress.streak / 7), 5);

    // Dynamic glow color based on streak length (Professional Palette)
    const glowColors = ['var(--accent)', 'var(--primary)', 'oklch(0.65 0.12 300)', 'oklch(0.75 0.15 40)', 'oklch(0.6 0.18 20)'];
    const currentColor = glowColors[streakLevel % glowColors.length];

    return (
        <div className="relative overflow-hidden p-8 rounded-[2.5rem] glass-4k border-none group shadow-2xl transition-all duration-700">
            {/* Background Glow */}
            <div
                className="absolute inset-0 opacity-5 blur-[100px] transition-colors duration-1000"
                style={{ backgroundColor: currentColor }}
            />

            <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center relative">
                        <Flame className="h-6 w-6 relative z-10" style={{ color: currentColor }} />
                        <motion.div
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 blur-lg rounded-full"
                            style={{ backgroundColor: currentColor }}
                        />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Biological Streak</h4>
                        <div className="flex gap-1.5 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 w-5 rounded-full transition-all duration-500 ${i <= streakLevel ? 'opacity-100' : 'opacity-10 bg-black'}`}
                                    style={{ backgroundColor: i <= streakLevel ? currentColor : undefined }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex -space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500/50" />
                </div>
            </div>

            <div className="relative flex flex-col items-center py-4">
                <motion.div
                    key={progress.streak}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                >
                    <div
                        className="text-8xl font-black italic tracking-tighter leading-none"
                        style={{
                            color: 'var(--foreground)',
                            textShadow: `0 0 30px ${currentColor}22`
                        }}
                    >
                        {progress.streak}
                    </div>
                    <div
                        className="absolute -top-4 -right-4"
                        style={{ color: currentColor }}
                    >
                        <Sparkles className="h-6 w-6 animate-pulse" />
                    </div>
                </motion.div>

                <div className="text-[10px] font-black uppercase tracking-[0.4em] mt-4 text-foreground/40">
                    Cycles Completed
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/5 flex justify-between items-center glass-4k rounded-b-[2.5rem] rounded-t-none -mx-8 px-8 pb-2 shadow-none border-none">
                <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Next Evolution</p>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent),0.3)]" />
                        <span className="text-xs font-bold uppercase tracking-tight text-foreground/80">Hyper-Legendary (7 Days)</span>
                    </div>
                </div>
                <div
                    className="h-12 w-12 rounded-2xl border border-black/5 flex items-center justify-center bg-black/5 group-hover:scale-110 transition-transform"
                    style={{ borderColor: `${currentColor}33` }}
                >
                    <Zap className="h-5 w-5" style={{ color: currentColor }} />
                </div>
            </div>
        </div>
    );
}
