"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/lib/types";
import { useFitnessStore } from "@/store/fitness-store";
import { Dumbbell, Home, Clock, Target, Zap } from "lucide-react";

const goals = [
    { id: "lose_weight", label: "Lose Weight", icon: Target },
    { id: "build_muscle", label: "Build Muscle", icon: Dumbbell },
    { id: "stay_fit", label: "Stay Fit", icon: Zap },
    { id: "improve_endurance", label: "Improve Endurance", icon: Clock },
];

const equipmentOptions = [
    { id: "home", label: "Home Workout", icon: Home },
    { id: "gym", label: "Gym Access", icon: Dumbbell },
    { id: "none", label: "No Equipment", icon: Zap },
];

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const [profile, setProfile] = useState<Partial<UserProfile>>({
        level: "beginner",
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <Card className="w-full max-w-2xl glass-strong neon-glow border border-white/10">
                <CardHeader>
                    <CardTitle className="text-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
                        Welcome to FitTrack
                    </CardTitle>
                    <CardDescription>
                        Let’s personalize your fitness journey
                    </CardDescription>

                    {/* STEP INDICATOR */}
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`h-2 flex-1 rounded-full transition-all ${s <= step
                                        ? "bg-gradient-to-r from-purple-500 to-cyan-400"
                                        : "bg-muted"
                                    }`}
                            />
                        ))}
                    </div>
                </CardHeader>

                <CardContent className="min-h-[420px]">
                    <AnimatePresence mode="wait">

                        {/* STEP 1 */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <Label>Age</Label>
                                <Input
                                    type="number"
                                    value={profile.age ?? ""}
                                    onChange={(e) =>
                                        setProfile({ ...profile, age: Number(e.target.value) })
                                    }
                                />

                                <Label>Height (cm)</Label>
                                <Input
                                    type="number"
                                    value={profile.height ?? ""}
                                    onChange={(e) =>
                                        setProfile({ ...profile, height: Number(e.target.value) })
                                    }
                                />

                                <Label>Weight (kg)</Label>
                                <Input
                                    type="number"
                                    value={profile.weight ?? ""}
                                    onChange={(e) =>
                                        setProfile({ ...profile, weight: Number(e.target.value) })
                                    }
                                />

                                <Button
                                    className="w-full mt-4 gradient-purple-cyan"
                                    disabled={
                                        !isNumber(profile.age) ||
                                        !isNumber(profile.height) ||
                                        !isNumber(profile.weight)
                                    }
                                    onClick={() => setStep(2)}
                                >
                                    Continue
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <motion.div key="step2" className="space-y-4">
                                {goals.map((g) => (
                                    <Button
                                        key={g.id}
                                        variant="outline"
                                        className={`w-full justify-start ${profile.goal === g.id
                                                ? "border-purple-500 bg-purple-500/20"
                                                : ""
                                            }`}
                                        onClick={() =>
                                            setProfile({ ...profile, goal: g.id as any })
                                        }
                                    >
                                        <g.icon className="mr-2" />
                                        {g.label}
                                    </Button>
                                ))}

                                <Button
                                    className="w-full mt-4 gradient-purple-cyan"
                                    disabled={!profile.goal}
                                    onClick={() => setStep(3)}
                                >
                                    Continue
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                            <motion.div key="step3" className="space-y-4">
                                {equipmentOptions.map((e) => (
                                    <Button
                                        key={e.id}
                                        variant="outline"
                                        className={`w-full justify-start ${profile.equipment === e.id
                                                ? "border-cyan-400 bg-cyan-400/20"
                                                : ""
                                            }`}
                                        onClick={() =>
                                            setProfile({ ...profile, equipment: e.id as any })
                                        }
                                    >
                                        <e.icon className="mr-2" />
                                        {e.label}
                                    </Button>
                                ))}

                                <Button
                                    className="w-full mt-4 gradient-cyan-lime"
                                    disabled={!profile.equipment}
                                    onClick={() => setStep(4)}
                                >
                                    Continue
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 4 */}
                        {step === 4 && (
                            <motion.div key="step4" className="space-y-4">
                                <Label>Daily workout time (minutes)</Label>
                                <Input
                                    type="number"
                                    value={profile.timeAvailable ?? ""}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            timeAvailable: Number(e.target.value),
                                        })
                                    }
                                />

                                <div className="grid grid-cols-4 gap-2">
                                    {[15, 30, 45, 60].map((t) => (
                                        <Button
                                            key={t}
                                            variant="outline"
                                            className={`${profile.timeAvailable === t
                                                    ? "border-lime-400 bg-lime-400/20"
                                                    : ""
                                                }`}
                                            onClick={() =>
                                                setProfile({ ...profile, timeAvailable: t })
                                            }
                                        >
                                            {t} min
                                        </Button>
                                    ))}
                                </div>

                                <Button
                                    className="w-full mt-4 gradient-purple-lime"
                                    disabled={!isNumber(profile.timeAvailable)}
                                    onClick={handleComplete}
                                >
                                    Start Training
                                </Button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
