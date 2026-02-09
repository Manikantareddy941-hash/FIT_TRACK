"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFitnessStore } from "@/store/fitness-store";
import { Flame } from "lucide-react";

export function StreakTracker() {
    const progress = useFitnessStore((state) => state.progress);

    return (
        <Card className="border-lime-400/20 bg-gradient-to-br from-lime-500/10 to-lime-600/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5" style={{ color: '#A3FF12' }} />
                    Workout Streak
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <div className="text-6xl font-bold neon-glow-lime" style={{ color: '#A3FF12' }}>
                        {progress.streak}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                        {progress.streak === 1 ? 'day' : 'days'} in a row
                    </div>
                    <div className="mt-4 grid grid-cols-7 gap-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 rounded-full ${i < progress.streak % 7 ? 'bg-lime-400' : 'bg-muted'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
