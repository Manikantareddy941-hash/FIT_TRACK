"use client";

import { useFitnessStore } from "@/store/fitness-store";
import { motion } from "framer-motion";
import { Flame, Footprints, Timer, TrendingUp } from "lucide-react";

export function StatsGlance() {
    const stats = useFitnessStore((state) => state.stats);
    const activeSession = useFitnessStore((state) => state.activeSession);

    const data = [
        {
            label: "Burn",
            value: stats.calories + activeSession.burnedCalories,
            unit: "kcal",
            icon: Flame,
            color: "text-destructive",
            bg: "bg-destructive/10",
        },
        {
            label: "Steps",
            value: stats.steps + activeSession.estimatedSteps,
            unit: "",
            icon: Footprints,
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            label: "Move",
            value: stats.moveMin,
            unit: "min",
            icon: Timer,
            color: "text-accent",
            bg: "bg-accent/10",
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-[2.5rem] glass-4k group transition-all duration-300 hover:scale-[1.02]"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl ${item.bg}`}>
                            <item.icon className={`h-6 w-6 ${item.color}`} />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-foreground/20 group-hover:text-foreground/40 transition-colors">
                            <TrendingUp className="h-3 w-3" />
                            <span>+12%</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
                            Daily {item.label}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-4xl font-black italic tracking-tighter text-foreground uppercase">
                                {item.value.toLocaleString()}
                            </h3>
                            {item.unit && (
                                <span className="text-sm font-black uppercase tracking-widest text-foreground/20">
                                    {item.unit}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
