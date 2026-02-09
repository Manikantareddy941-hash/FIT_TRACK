"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Activity, Clock, Zap, Target } from "lucide-react";
import { useFitnessStore } from "@/store/fitness-store";
import { motion, AnimatePresence } from "framer-motion";

export function AddActivityDialog() {
    const addActivity = useFitnessStore((state) => state.addActivity);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("Running");
    const [duration, setDuration] = useState("");
    const [calories, setCalories] = useState("");
    const [steps, setSteps] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let icon = "🏃";
        let color = "bg-blue-500/10 text-blue-500";

        if (type.toLowerCase().includes("cycl")) {
            icon = "🚴";
            color = "bg-green-500/10 text-green-500";
        } else if (type.toLowerCase().includes("weight") || type.toLowerCase().includes("gym")) {
            icon = "💪";
            color = "bg-orange-500/10 text-orange-500";
        } else if (type.toLowerCase().includes("yoga")) {
            icon = "🧘";
            color = "bg-purple-500/10 text-purple-500";
        }

        addActivity({
            title: type,
            description: `${duration} mins`,
            calories: parseInt(calories) || 0,
            steps: parseInt(steps) || 0,
            icon,
            color,
        });

        setOpen(false);
        setType("");
        setDuration("");
        setCalories("");
        setSteps("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gradient-purple-cyan neon-glow h-12 px-6 rounded-xl font-black italic uppercase tracking-widest text-[10px] gap-2 active:scale-95 transition-all">
                    <Plus className="h-4 w-4" /> Add Protocol
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] glass-4k border-white/5 rounded-[2.5rem] shadow-premium p-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-400" />
                <DialogHeader className="p-8 pb-4">
                    <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-white">Registry <span className="text-purple-500">Input</span></DialogTitle>
                    <DialogDescription className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Document new physiological expenditure sessions
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="type" className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2">
                                <Activity className="h-3 w-3" /> Operation Type
                            </Label>
                            <Input
                                id="type"
                                placeholder="Running, Cycling, Hybrid..."
                                className="h-14 rounded-2xl bg-white/5 border-white/5 font-bold focus:ring-purple-500/20 px-4 transition-all"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="duration" className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2">
                                    <Clock className="h-3 w-3" /> Window (Min)
                                </Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    placeholder="30"
                                    className="h-14 rounded-2xl bg-white/5 border-white/5 font-bold focus:ring-purple-500/20 px-4 transition-all"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="calories" className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2">
                                    <Zap className="h-3 w-3" /> Energy (Kcal)
                                </Label>
                                <Input
                                    id="calories"
                                    type="number"
                                    placeholder="300"
                                    className="h-14 rounded-2xl bg-white/5 border-white/5 font-bold focus:ring-purple-500/20 px-4 transition-all"
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="steps" className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2">
                                <Target className="h-3 w-3" /> Locomotion (Steps)
                            </Label>
                            <Input
                                id="steps"
                                type="number"
                                placeholder="Optional"
                                className="h-14 rounded-2xl bg-white/5 border-white/5 font-bold focus:ring-purple-500/20 px-4 transition-all"
                                value={steps}
                                onChange={(e) => setSteps(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="pt-4 mt-8 border-t border-white/5">
                        <Button type="submit" className="w-full h-16 rounded-2xl gradient-purple-cyan font-black italic uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all text-black">
                            Confirm Registry Entry
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
