"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/lib/types";
import { useFitnessStore } from "@/store/fitness-store";
import {
  Dumbbell,
  Home,
  Clock,
  Target,
  Zap,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type GoalId =
  | "lose_weight"
  | "build_muscle"
  | "stay_fit"
  | "improve_endurance";

type EquipmentId = "home" | "gym" | "none";

const goals: {
  id: GoalId;
  label: string;
  icon: any;
  desc: string;
}[] = [
  { id: "lose_weight", label: "Lose Weight", icon: Target, desc: "Burn fat & lean out" },
  { id: "build_muscle", label: "Build Muscle", icon: Dumbbell, desc: "Gain mass & strength" },
  { id: "stay_fit", label: "Stay Fit", icon: Zap, desc: "Maintain peak health" },
  { id: "improve_endurance", label: "Endurance", icon: Clock, desc: "Boost stamina & speed" },
];

const equipmentOptions: {
  id: EquipmentId;
  label: string;
  icon: any;
  desc: string;
}[] = [
  { id: "home", label: "Home Base", icon: Home, desc: "Minimalist setup" },
  { id: "gym", label: "Power Gym", icon: Dumbbell, desc: "Full equipment access" },
  { id: "none", label: "No Gear", icon: Zap, desc: "Bodyweight focus" },
];

export function OnboardingWizard({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [profile, setProfile] = useState<Partial<UserProfile>>({
    level: "beginner",
    units: "metric",
  });

  const setUserProfile = useFitnessStore((s) => s.setUserProfile);
  const completeOnboarding = useFitnessStore((s) => s.completeOnboarding);

  const isNumber = (v: unknown): v is number =>
    typeof v === "number" && Number.isFinite(v);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl rounded-3xl border p-10 md:p-14"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" className="space-y-6">
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
                disabled={
                  !isNumber(profile.age) ||
                  !isNumber(profile.height) ||
                  !isNumber(profile.weight)
                }
                onClick={() => setStep(2)}
              >
                Continue <ChevronRight />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" className="space-y-4">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() =>
                    setProfile({ ...profile, goal: g.id })
                  }
                  className={`p-4 rounded-lg border ${
                    profile.goal === g.id ? "bg-primary/10" : ""
                  }`}
                >
                  {g.label}
                </button>
              ))}
              <Button disabled={!profile.goal} onClick={() => setStep(3)}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" className="space-y-4">
              {equipmentOptions.map((e) => (
                <button
                  key={e.id}
                  onClick={() =>
                    setProfile({ ...profile, equipment: e.id })
                  }
                  className={`p-4 rounded-lg border ${
                    profile.equipment === e.id ? "bg-primary/10" : ""
                  }`}
                >
                  {e.label}
                </button>
              ))}
              <Button disabled={!profile.equipment} onClick={() => setStep(4)}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" className="space-y-6">
              <Label>Time Available (minutes)</Label>
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

              <p className="text-xs text-muted-foreground">
                &quot;Your biological integrity is our priority.&quot;
              </p>

              <Button
                disabled={!isNumber(profile.timeAvailable)}
                onClick={handleComplete}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Finish
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
