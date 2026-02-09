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
import { Plus } from "lucide-react";
import { useFitnessStore } from "@/store/fitness-store";

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
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Activity
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Log Workout</DialogTitle>
                    <DialogDescription>
                        Add a new activity to track your daily progress.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Input
                                id="type"
                                placeholder="Running, Cycling..."
                                className="col-span-3"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right">
                                Minutes
                            </Label>
                            <Input
                                id="duration"
                                type="number"
                                placeholder="30"
                                className="col-span-3"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="calories" className="text-right">
                                Calories
                            </Label>
                            <Input
                                id="calories"
                                type="number"
                                placeholder="300"
                                className="col-span-3"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="steps" className="text-right">
                                Steps
                            </Label>
                            <Input
                                id="steps"
                                type="number"
                                placeholder="Optional"
                                className="col-span-3"
                                value={steps}
                                onChange={(e) => setSteps(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Activity</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
