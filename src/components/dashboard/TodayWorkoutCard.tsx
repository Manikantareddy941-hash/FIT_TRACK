"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFitnessStore } from "@/store/fitness-store";
import { generateWorkoutPlan } from "@/lib/workoutGenerator";
import { Play, Dumbbell, Clock, Flame } from "lucide-react";
import Link from "next/link";

export function TodayWorkoutCard() {
    const userProfile = useFitnessStore((state) => state.userProfile);
    const todayWorkout = useFitnessStore((state) => state.todayWorkout);
    const setWorkoutPlan = useFitnessStore((state) => state.setWorkoutPlan);
    const progress = useFitnessStore((state) => state.progress);

    useEffect(() => {
        if (userProfile && !todayWorkout) {
            const plan = generateWorkoutPlan(userProfile);
            setWorkoutPlan(plan);
        }
    }, [userProfile, todayWorkout, setWorkoutPlan]);

    if (!todayWorkout) {
        return null;
    }

    return (
        <Card className="col-span-1 lg:col-span-2 border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 neon-glow-purple">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5" style={{ color: '#7B5CFF' }} />
                    Today's Workout
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold">{todayWorkout.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {todayWorkout.totalDuration} min
                            </span>
                            <span className="flex items-center gap-1">
                                <Flame className="h-4 w-4" />
                                ~{todayWorkout.caloriesBurn} cal
                            </span>
                            <span className="flex items-center gap-1">
                                <Dumbbell className="h-4 w-4" />
                                {todayWorkout.exercises.length} exercises
                            </span>
                        </div>
                    </div>
                    <Link href="/workout">
                        <Button size="lg" className="gradient-purple-cyan neon-glow">
                            <Play className="h-5 w-5 mr-2" />
                            Start Workout
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {todayWorkout.exercises.slice(0, 6).map((exercise, idx) => (
                        <div
                            key={exercise.id}
                            className="p-3 rounded-lg bg-card/50 border border-border/50"
                        >
                            <div className="font-medium text-sm">{exercise.name}</div>
                            <div className="text-xs text-muted-foreground">
                                {exercise.reps ? `${exercise.reps} reps` : `${exercise.duration}s`} × {exercise.sets} sets
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
