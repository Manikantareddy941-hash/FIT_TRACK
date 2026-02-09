"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Plus, Minus, Waves } from "lucide-react";
import { useFitnessStore } from "@/store/fitness-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WaterTracker() {
    const waterGlasses = useFitnessStore((state) => state.waterGlasses);
    const waterGoal = useFitnessStore((state) => state.waterGoal);
    const addWater = useFitnessStore((state) => state.addWater);
    const removeWater = useFitnessStore((state) => state.removeWater);

    const percentage = Math.min((waterGlasses / waterGoal) * 100, 100);

    return (
        <Card className="relative overflow-hidden glass-4k shadow-premium border-white/5 group">
            <CardHeader className="relative pb-0">
                <CardTitle className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                    <Droplet className="h-4 w-4" />
                    Hydration Log
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 relative">
                <div className="relative h-56 w-full rounded-[2.5rem] bg-black/40 border border-white/5 overflow-hidden group/tank">
                    {/* Water Level */}
                    <motion.div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500/40 to-cyan-400/20"
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className="absolute top-0 left-0 w-full h-8 -translate-y-1/2 overflow-hidden">
                            <motion.div
                                className="w-[200%] h-full opacity-30 flex"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Waves className="h-full w-full text-cyan-300" />
                                <Waves className="h-full w-full text-cyan-300" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <motion.div
                            key={waterGlasses}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-1"
                        >
                            <div className="text-6xl font-black italic tracking-tighter text-white">
                                {waterGlasses}<span className="text-xl text-cyan-400/50 not-italic ml-1">/{waterGoal}</span>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400/70">Bio-Liquid (Units)</div>
                        </motion.div>
                    </div>

                    {/* Percentage Indicator */}
                    <div className="absolute top-4 right-6">
                        <div className="text-[10px] font-black italic text-white/30 tracking-tighter">{Math.round(percentage)}% CAP</div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 bg-white/5 p-2 rounded-3xl border border-white/5">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={removeWater}
                        className="h-12 w-12 rounded-2xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                    >
                        <Minus className="h-5 w-5" />
                    </Button>
                    <div className="h-8 w-px bg-white/10" />
                    <Button
                        onClick={addWater}
                        className="flex-1 h-14 rounded-2xl gradient-purple-cyan neon-glow font-black italic uppercase tracking-wider text-sm shadow-xl hover:scale-[1.02] transition-transform"
                    >
                        <Plus className="h-5 w-5 mr-1" />
                        Inject H2O
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
