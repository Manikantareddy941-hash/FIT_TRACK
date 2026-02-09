"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFitnessStore } from "@/store/fitness-store";
import { generateWorkoutPlan } from "@/lib/workoutGenerator";
import { Play, Dumbbell, Clock, Flame, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function TodayWorkoutCard() {
    const userProfile = useFitnessStore((state) => state.userProfile);
    const todayWorkout = useFitnessStore((state) => state.todayWorkout);
    const setWorkoutPlan = useFitnessStore((state) => state.setWorkoutPlan);

    useEffect(() => {
        if (userProfile && !todayWorkout) {
            const plan = generateWorkoutPlan(userProfile);
            setWorkoutPlan(plan);
        }
    }, [userProfile, todayWorkout, setWorkoutPlan]);

    if (!todayWorkout) return null;

    return (
        <Card className="col-span-1 lg:col-span-2 glass-4k shadow-premium border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-50" />

            <CardHeader className="relative pb-0">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                        <Dumbbell className="h-4 w-4" />
                        Active Protocol
                    </CardTitle>
                    <div className="flex gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8 relative pt-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
                            {todayWorkout.name}
                        </h3>
                        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                            <span className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-cyan-400" />
                                {todayWorkout.totalDuration} Min
                            </span>
                            <span className="flex items-center gap-2">
                                <Flame className="h-3 w-3 text-orange-500" />
                                {todayWorkout.caloriesBurn} Kcal
                            </span>
                            <span className="flex items-center gap-2">
                                <Dumbbell className="h-3 w-3 text-purple-500" />
                                {todayWorkout.exercises.length} Units
                            </span>
                        </div>
                    </div>

                    <Link href="/workout">
                        <Button className="h-16 px-8 rounded-2xl gradient-purple-cyan neon-glow hover:scale-105 transition-all text-lg font-black italic uppercase tracking-tight shadow-xl">
                            <Play className="h-5 w-5 mr-3 fill-current" />
                            Initiate session
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {todayWorkout.exercises.slice(0, 4).map((exercise, idx) => (
                        <motion.div
                            key={exercise.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1 group-hover/item:text-purple-400 transition-colors">
                                Unit {idx + 1}
                            </div>
                            <div className="font-black italic text-sm tracking-tight truncate mb-1">{exercise.name}</div>
                            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">
                                {exercise.reps ? `${exercise.reps} reps` : `${exercise.duration}s`} × {exercise.sets} Sets
                            </div>
                        </motion.div>
                    ))}
                    <div className="flex items-center justify-center p-4 rounded-3xl border border-dashed border-white/10 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group/more">
                        <span className="text-[10px] font-black uppercase tracking-widest mr-2">Full Roster</span>
                        <ChevronRight className="h-3 w-3 group-hover/more:translate-x-1 transition-transform" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
