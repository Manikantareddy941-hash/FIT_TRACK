"use client";

import { useState, useEffect } from "react";
import { useFitnessStore } from "@/store/fitness-store";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, CheckCircle2, Timer, Music, Dumbbell, Clock, Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import { MusicPlayer } from "@/components/dashboard/MusicPlayer";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

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
    const [showMusic, setShowMusic] = useState(true);

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
                <div className="glass-4k p-12 rounded-[2.5rem] border-white/5 text-center shadow-premium">
                    <Dumbbell className="h-20 w-20 mx-auto mb-6 text-primary animate-pulse" />
                    <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase mb-2">Protocol Void</h3>
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] mb-8">No active session footprint detected</p>
                    <Button onClick={() => router.push('/')} className="gradient-primary neon-glow h-14 px-10 rounded-2xl font-black italic uppercase tracking-widest text-sm">
                        Return to Control Center
                    </Button>
                </div>
            </div>
        );
    }

    const currentExercise = todayWorkout.exercises[currentExerciseIndex];
    const progressPerc = ((currentExerciseIndex + 1) / todayWorkout.exercises.length) * 100;

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
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        if (sessionId) {
            completeWorkout(sessionId, todayWorkout.caloriesBurn);
        }

        setTimeout(() => {
            router.push('/');
        }, 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-[1400px] mx-auto space-y-12 pb-24"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Side: Performance Metrics & Controls */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse shadow-[0_0_10px_rgba(var(--destructive),0.5)]" />
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-destructive">Live Session Active</h4>
                            </div>
                            <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">
                                Training <span className="text-primary">Protocol</span>
                            </h2>
                            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">{todayWorkout.name}</p>
                        </div>
                        <Button
                            variant="outline"
                            className="h-14 px-6 rounded-2xl border-white/5 glass-4k hover:bg-white/10 transition-all font-black italic uppercase tracking-widest text-[10px]"
                            onClick={() => setShowMusic(!showMusic)}
                        >
                            <Music className="h-4 w-4 mr-2" />
                            Audio Interface
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Efficiency Progress</span>
                            <span className="text-2xl font-black italic text-accent">{Math.round(progressPerc)}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPerc}%` }}
                                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            />
                        </div>
                    </div>

                    <div className="glass-4k rounded-[2.5rem] border-white/5 shadow-premium overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentExerciseIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="p-10 space-y-10"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full inline-block">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-primary">{currentExercise.muscleGroup} Targeted</span>
                                        </div>
                                        <h3 className="text-5xl font-black italic tracking-tighter text-white uppercase">{currentExercise.name}</h3>
                                    </div>
                                    <div className="h-20 w-20 rounded-[2rem] glass-4k flex items-center justify-center border-white/5 shadow-2xl">
                                        <Dumbbell className="h-8 w-8 text-primary" />
                                    </div>
                                </div>

                                <div className="aspect-video bg-black/40 rounded-[2rem] border border-white/5 flex items-center justify-center relative group overflow-hidden shadow-inner">
                                    <motion.div
                                        className="text-[10rem] filter drop-shadow-[0_0_40px_rgba(var(--primary),0.3)] grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 font-black italic"
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ repeat: Infinity, duration: 3 }}
                                    >
                                        BIO
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-6 left-8 flex gap-2">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                                            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Video Feed Optimized</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-6 grid-cols-3">
                                    <MetricBox label={currentExercise.reps ? 'Reps' : 'Duration'} value={currentExercise.reps || currentExercise.duration || 0} color="text-primary" />
                                    <MetricBox label="Sets" value={currentExercise.sets || 0} color="text-accent" />
                                    <MetricBox label="Rest Interval" value={`${currentExercise.restTime || 0}s`} color="text-accent" />
                                </div>

                                <AnimatePresence>
                                    {isResting && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="p-10 bg-accent/5 rounded-[2rem] border border-accent/10 text-center space-y-4 shadow-[0_0_50px_rgba(var(--accent),0.1)] relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-accent/20">
                                                <motion.div
                                                    className="h-full bg-accent"
                                                    initial={{ width: "100%" }}
                                                    animate={{ width: "0%" }}
                                                    transition={{ duration: currentExercise.restTime, ease: "linear" }}
                                                />
                                            </div>
                                            <div className="text-7xl font-black italic tracking-tighter text-accent">{timer}<span className="text-xl not-italic ml-2 opacity-50">S</span></div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-accent/60">Bio-Recovery Protocol Active</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex gap-6">
                                    <Button
                                        onClick={handleRest}
                                        disabled={isResting}
                                        className="h-20 flex-1 rounded-2xl glass-4k border-white/5 hover:bg-white/10 font-black italic uppercase tracking-widest text-sm transition-all shadow-xl disabled:opacity-30"
                                    >
                                        <Pause className="h-5 w-5 mr-3" />
                                        Protocol Pause
                                    </Button>
                                    <Button
                                        onClick={handleNext}
                                        className="h-20 flex-[1.5] rounded-2xl gradient-primary neon-glow font-black italic uppercase tracking-widest text-lg shadow-2xl active:scale-95 transition-all text-black"
                                    >
                                        {currentExerciseIndex < todayWorkout.exercises.length - 1 ? (
                                            <>
                                                Continue Procedure
                                                <SkipForward className="h-6 w-6 ml-3 fill-current" />
                                            </>
                                        ) : (
                                            <>
                                                Complete Cycle
                                                <CheckCircle2 className="h-6 w-6 ml-3 fill-current" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: Environment & Data Flow */}
                <div className="lg:col-span-4 space-y-10">
                    <AnimatePresence>
                        {showMusic && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <MusicPlayer autoStart={true} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="p-8 rounded-[2.5rem] glass-4k border-white/5 space-y-6 shadow-premium">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Coming Operations</h4>
                            <span className="text-[8px] font-black py-1 px-2 rounded-md bg-white/5 border border-white/10 uppercase tracking-widest">Next Phase</span>
                        </div>
                        <div className="space-y-4">
                            {todayWorkout.exercises.slice(currentExerciseIndex + 1, currentExerciseIndex + 4).map((ex, i) => (
                                <div key={ex.id} className="flex items-center gap-4 group cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center font-black italic text-sm border border-white/5 group-hover:border-primary/40 transition-colors">
                                        {currentExerciseIndex + i + 2}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black italic uppercase tracking-tight text-white">{ex.name}</p>
                                        <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{ex.muscleGroup}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] glass-4k border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Flame className="h-20 w-20 text-orange-500" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(var(--accent),0.5)]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">Biological Directive</span>
                            </div>
                            <p className="text-sm font-bold text-muted-foreground leading-relaxed uppercase tracking-tighter italic">
                                "Peak performance is accessed via intentional hydration. Small, systematic sips maintain cellular velocity during high-output segments."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 rounded-[2rem] glass-4k border-white/5 flex flex-col items-center justify-center text-center">
                            <Clock className="h-5 w-5 text-accent mb-2" />
                            <div className="text-xl font-black italic text-white uppercase">{todayWorkout.totalDuration}<span className="text-[10px] not-italic opacity-40 ml-1">M</span></div>
                            <div className="text-[8px] font-bold uppercase tracking-widest text-accent/40">Total Window</div>
                        </div>
                        <div className="p-6 rounded-[2rem] glass-4k border-white/5 flex flex-col items-center justify-center text-center">
                            <Flame className="h-5 w-5 text-destructive mb-2" />
                            <div className="text-xl font-black italic text-white uppercase">{todayWorkout.caloriesBurn}<span className="text-[10px] not-italic opacity-40 ml-1">K</span></div>
                            <div className="text-[8px] font-bold uppercase tracking-widest text-destructive/40">Energy Output</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function MetricBox({ label, value, color }: { label: string; value: string | number; color: string }) {
    return (
        <div className="p-6 rounded-[2rem] glass-4k border-white/5 text-center group transition-all duration-300 hover:bg-white/5">
            <div className={`text-4xl font-black italic mb-2 tracking-tighter ${color} drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]`}>
                {value}
            </div>
            <div className="text-[9px] uppercase font-black text-muted-foreground/40 tracking-[0.2em]">
                {label}
            </div>
        </div>
    );
}
