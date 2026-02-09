"use client";

import { useFitnessStore } from "@/store/fitness-store";
import { UserMood } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
    Smile,
    Zap,
    Focus as FocusIcon,
    Coffee,
    CloudRain,
    MessageSquare,
    Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const moods: { id: UserMood; label: string; icon: any; color: string; bg: string }[] = [
    { id: 'energized', label: 'Energized', icon: Zap, color: '#A3FF12', bg: 'rgba(163, 255, 18, 0.1)' },
    { id: 'focused', label: 'Focused', icon: FocusIcon, color: '#00E5FF', bg: 'rgba(0, 229, 255, 0.1)' },
    { id: 'stressed', label: 'Stressed', icon: MessageSquare, color: '#7B5CFF', bg: 'rgba(123, 92, 255, 0.1)' },
    { id: 'tired', label: 'Tired', icon: Coffee, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
    { id: 'unmotivated', label: 'Low Energy', icon: CloudRain, color: '#6B7280', bg: 'rgba(107, 114, 128, 0.1)' },
];

export function MoodSelector() {
    const userProfile = useFitnessStore((state) => state.userProfile);
    const setUserMood = useFitnessStore((state) => state.setUserMood);
    const setWorkoutPlan = useFitnessStore((state) => state.setWorkoutPlan);

    const handleMoodSelect = (mood: UserMood) => {
        const { generateWorkoutPlan } = require("@/lib/workoutGenerator");
        setUserMood(mood);
        if (userProfile) {
            const newPlan = generateWorkoutPlan({ ...userProfile, currentMood: mood });
            setWorkoutPlan(newPlan);
        }
    };

    return (
        <div className="space-y-6 p-6 rounded-[2.5rem] glass-4k border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20">
                <Sparkles className="h-12 w-12 text-purple-500 animate-pulse" />
            </div>

            <div className="relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 mb-4 ml-1">Current State Analysis</h3>
                <div className="flex flex-wrap gap-3">
                    {moods.map((mood, idx) => {
                        const isActive = userProfile?.currentMood === mood.id;
                        return (
                            <motion.div
                                key={mood.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Button
                                    onClick={() => handleMoodSelect(mood.id)}
                                    className={`h-14 px-6 rounded-2xl transition-all border-fine relative group/mood ${isActive
                                            ? 'bg-white/10 text-white border-white/20'
                                            : 'bg-white/5 text-muted-foreground border-transparent hover:border-white/10 hover:bg-white/10 hover:text-white'
                                        }`}
                                    style={{
                                        boxShadow: isActive ? `0 10px 30px -5px ${mood.color}33` : 'none'
                                    }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="mood-active-glow"
                                            className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-current to-transparent"
                                            style={{ color: mood.color }}
                                        />
                                    )}
                                    <mood.icon
                                        className={`h-5 w-5 mr-3 transition-colors ${isActive ? '' : 'grayscale group-hover/mood:grayscale-0'}`}
                                        style={{ color: isActive ? mood.color : undefined }}
                                    />
                                    <span className="text-xs font-black italic uppercase tracking-widest">{mood.label}</span>
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
