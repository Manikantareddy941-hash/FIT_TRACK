"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/lib/types";
import { useFitnessStore } from "@/store/fitness-store";
import { Dumbbell, Home, Clock, Target, Zap, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

const goals = [
    { id: "lose_weight", label: "Lose Weight", icon: Target, desc: "Burn fat & lean out" },
    { id: "build_muscle", label: "Build Muscle", icon: Dumbbell, desc: "Gain mass & strength" },
    { id: "stay_fit", label: "Stay Fit", icon: Zap, desc: "Maintain peak health" },
    { id: "improve_endurance", label: "Endurance", icon: Clock, desc: "Boost stamina & speed" },
];

const equipmentOptions = [
    { id: "home", label: "Home Base", icon: Home, desc: "Minimalist setup" },
    { id: "gym", label: "Power Gym", icon: Dumbbell, desc: "Full equipment access" },
    { id: "none", label: "No Gear", icon: Zap, desc: "Bodyweight focus" },
];

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<Partial<UserProfile>>({
        level: "beginner",
        units: "metric",
    });

    const setUserProfile = useFitnessStore((s) => s.setUserProfile);
    const completeOnboarding = useFitnessStore((s) => s.completeOnboarding);

    const isNumber = (v: unknown) => Number.isFinite(v);

    const handleComplete = () => {
        const isValid =
            isNumber(profile.age) &&
            isNumber(profile.height) &&
            isNumber(profile.weight) &&
            isNumber(profile.timeAvailable) &&
            !!profile.goal &&
            !!profile.equipment;

        if (!isValid) return;

        setUserProfile(profile as UserProfile);
        completeOnboarding();
        onComplete();
        router.refresh();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl glass-4k rounded-[3rem] border-white/5 shadow-premium relative overflow-hidden p-10 md:p-14"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-lime-400 shadow-[0_0_15px_rgba(123,92,255,0.5)]"
                        animate={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-purple-400">Initialize Sequence</span>
                            </div>
                            <div className="h-px flex-1 bg-white/5" />
                            <span className="text-[10px] font-black text-white/20 tracking-widest">0{step} / 04</span>
                        </div>
                        <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-white">
                            Bio-Data <span className="text-purple-500">Entry</span>
                        </h2>
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest leading-relaxed">Customize your biological profile for optimal protocol generation</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* STEP 1 */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Chrono-Age</Label>
                                        <Input
                                            type="number"
                                            placeholder="25"
                                            className="h-16 rounded-2xl bg-white/5 border-white/5 font-black italic text-xl focus:ring-purple-500/20 px-6 transition-all"
                                            value={profile.age ?? ""}
                                            onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Stature (cm)</Label>
                                            <Input
                                                type="number"
                                                placeholder="180"
                                                className="h-16 rounded-2xl bg-white/5 border-white/5 font-black italic text-xl focus:ring-purple-500/20 px-6 transition-all"
                                                value={profile.height ?? ""}
                                                onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Mass (kg)</Label>
                                            <Input
                                                type="number"
                                                placeholder="75"
                                                className="h-16 rounded-2xl bg-white/5 border-white/5 font-black italic text-xl focus:ring-purple-500/20 px-6 transition-all"
                                                value={profile.weight ?? ""}
                                                onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    className="w-full h-16 rounded-3xl gradient-purple-cyan font-black italic uppercase tracking-[0.2em] text-sm overflow-hidden group shadow-2xl"
                                    disabled={!isNumber(profile.age) || !isNumber(profile.height) || !isNumber(profile.weight)}
                                    onClick={() => setStep(2)}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Validate Inputs <ChevronRight className="h-5 w-5 mt-0.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-4">
                                {goals.map((g, i) => (
                                    <motion.button
                                        key={g.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => setProfile({ ...profile, goal: g.id as any })}
                                        className={`flex items-center gap-6 p-6 rounded-[2rem] border transition-all duration-300 text-left group ${profile.goal === g.id
                                                ? "bg-purple-500/10 border-purple-500/50 shadow-[0_0_30px_rgba(123,92,255,0.15)]"
                                                : "bg-white/5 border-white/5 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${profile.goal === g.id ? "bg-purple-500 text-black shadow-lg" : "bg-white/5 text-purple-400"
                                            }`}>
                                            <g.icon className="h-7 w-7" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-black italic text-lg uppercase leading-none mb-1 text-white group-hover:text-purple-400 transition-colors">{g.label}</h3>
                                            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{g.desc}</p>
                                        </div>
                                    </motion.button>
                                ))}
                                <Button
                                    className="w-full h-16 rounded-3xl gradient-purple-cyan font-black italic uppercase tracking-[0.2em] text-sm mt-4 shadow-xl"
                                    disabled={!profile.goal}
                                    onClick={() => setStep(3)}
                                >
                                    Confirm Strategic Goal
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-4">
                                {equipmentOptions.map((e, i) => (
                                    <motion.button
                                        key={e.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => setProfile({ ...profile, equipment: e.id as any })}
                                        className={`flex items-center gap-6 p-6 rounded-[2rem] border transition-all duration-300 text-left group ${profile.equipment === e.id
                                                ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                                                : "bg-white/5 border-white/5 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${profile.equipment === e.id ? "bg-cyan-500 text-black shadow-lg" : "bg-white/5 text-cyan-400"
                                            }`}>
                                            <e.icon className="h-7 w-7" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-black italic text-lg uppercase leading-none mb-1 text-white group-hover:text-cyan-400 transition-colors">{e.label}</h3>
                                            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{e.desc}</p>
                                        </div>
                                    </motion.button>
                                ))}
                                <Button
                                    className="w-full h-16 rounded-3xl gradient-cyan-lime font-black italic uppercase tracking-[0.2em] text-sm mt-4 shadow-xl text-black"
                                    disabled={!profile.equipment}
                                    onClick={() => setStep(4)}
                                >
                                    Commit Environment
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 4 */}
                        {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-2">Temporal Allocation (min)</Label>
                                    <Input
                                        type="number"
                                        className="h-20 rounded-[2rem] bg-white/5 border-white/5 font-black italic text-4xl text-center focus:ring-lime-500/20 px-6 transition-all text-white"
                                        value={profile.timeAvailable ?? ""}
                                        onChange={(e) => setProfile({ ...profile, timeAvailable: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    {[15, 30, 45, 60].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setProfile({ ...profile, timeAvailable: t })}
                                            className={`h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 ${profile.timeAvailable === t
                                                    ? "bg-lime-400/10 border-lime-400 text-lime-400 shadow-[0_0_20px_rgba(163,255,18,0.1)]"
                                                    : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                                                }`}
                                        >
                                            <span className="text-xl font-black italic leading-none">{t}</span>
                                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">MIN</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-start gap-4">
                                    <ShieldCheck className="h-6 w-6 text-lime-400 mt-1" />
                                    <p className="text-[10px] font-bold text-muted-foreground/60 leading-relaxed uppercase tracking-tighter italic">"Your biological integrity is our priority. This protocol will be calibrated to your exact temporal window."</p>
                                </div>

                                <Button
                                    className="w-full h-20 rounded-[2rem] gradient-purple-cyan font-black italic uppercase tracking-[0.3em] text-lg shadow-2xl relative overflow-hidden group"
                                    disabled={!isNumber(profile.timeAvailable)}
                                    onClick={handleComplete}
                                >
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <Sparkles className="h-6 w-6 fill-current animate-pulse" />
                                        Launch Protocol
                                    </span>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
