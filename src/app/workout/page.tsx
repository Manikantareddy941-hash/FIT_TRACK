"use client";

import { useState, useEffect } from "react";
import { useFitnessStore } from "@/store/fitness-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipForward, CheckCircle2, Timer } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkoutPage() {
    const router = useRouter();
    const todayWorkout = useFitnessStore((state) => state.todayWorkout);
    const completeWorkout = useFitnessStore((state) => state.completeWorkout);
    const startWorkout = useFitnessStore((state) => state.startWorkout);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        if (todayWorkout && !sessionId) {
            const id = Math.random().toString(36).substr(2, 9);
            setSessionId(id);
            startWorkout(todayWorkout.id);
        }
    }, [todayWorkout, sessionId, startWorkout]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((t) => t - 1);
            }, 1000);
        } else if (timer === 0 && isActive) {
            setIsActive(false);
            if (isResting) {
                setIsResting(false);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timer, isResting]);

    if (!todayWorkout) {
        return (
            <div className="flex items-center justify-center h-full">
                <Card>
                    <CardContent className="p-8">
                        <p>No workout plan available. Complete onboarding first!</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentExercise = todayWorkout.exercises[currentExerciseIndex];
    const progress = ((currentExerciseIndex + 1) / todayWorkout.exercises.length) * 100;

    const handleNext = () => {
        if (currentExerciseIndex < todayWorkout.exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setIsActive(false);
            setTimer(0);
        } else {
            handleFinish();
        }
    };

    const handleRest = () => {
        setIsResting(true);
        setTimer(currentExercise.restTime);
        setIsActive(true);
    };

    const handleFinish = () => {
        if (sessionId) {
            completeWorkout(sessionId, todayWorkout.caloriesBurn);
        }
        router.push('/');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
                    Workout in Progress
                </h2>
                <p className="text-muted-foreground mt-1">{todayWorkout.name}</p>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Exercise {currentExerciseIndex + 1} of {todayWorkout.exercises.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
                <CardHeader>
                    <CardTitle className="text-2xl">{currentExercise.name}</CardTitle>
                    <p className="text-muted-foreground">{currentExercise.muscleGroup}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-2">💪</div>
                            <p className="text-sm text-muted-foreground">Exercise demonstration</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-3xl font-bold" style={{ color: '#7B5CFF' }}>
                                    {currentExercise.reps || `${currentExercise.duration}s`}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {currentExercise.reps ? 'Reps' : 'Duration'}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-3xl font-bold" style={{ color: '#00E5FF' }}>
                                    {currentExercise.sets}
                                </div>
                                <div className="text-sm text-muted-foreground">Sets</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-3xl font-bold" style={{ color: '#A3FF12' }}>
                                    {currentExercise.restTime}s
                                </div>
                                <div className="text-sm text-muted-foreground">Rest</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="p-4 bg-card/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Instructions</h4>
                        <p className="text-sm text-muted-foreground">{currentExercise.instructions}</p>
                    </div>

                    {isResting && (
                        <div className="text-center p-6 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                            <Timer className="h-8 w-8 mx-auto mb-2" style={{ color: '#00E5FF' }} />
                            <div className="text-4xl font-bold" style={{ color: '#00E5FF' }}>{timer}s</div>
                            <div className="text-sm text-muted-foreground">Rest Time</div>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Button
                            onClick={handleRest}
                            variant="outline"
                            className="flex-1"
                            disabled={isResting}
                        >
                            <Pause className="h-4 w-4 mr-2" />
                            Rest
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="flex-1 gradient-purple-cyan"
                        >
                            {currentExerciseIndex < todayWorkout.exercises.length - 1 ? (
                                <>
                                    <SkipForward className="h-4 w-4 mr-2" />
                                    Next Exercise
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Finish Workout
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
