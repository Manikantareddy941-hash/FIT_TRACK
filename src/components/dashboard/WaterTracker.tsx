"use client";

import { motion } from "framer-motion";
import { Droplet, Plus, Minus } from "lucide-react";
import { useFitnessStore } from "@/store/fitness-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WaterTracker() {
    const waterGlasses = useFitnessStore((state) => state.waterGlasses);
    const waterGoal = useFitnessStore((state) => state.waterGoal);
    const addWater = useFitnessStore((state) => state.addWater);
    const removeWater = useFitnessStore((state) => state.removeWater);

    const percentage = Math.min((waterGlasses / waterGoal) * 100, 100);

    return (
        <Card className="relative overflow-hidden border-cyan-400/20 bg-gradient-to-br from-cyan-500/5 to-cyan-600/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-5 w-5" style={{ color: '#00E5FF' }} />
                    Hydration
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative h-48 w-full rounded-xl bg-gradient-to-t from-cyan-950/50 to-transparent border border-cyan-500/20 overflow-hidden">
                    <motion.div
                        className="absolute bottom-0 w-full"
                        style={{ background: 'linear-gradient(to top, #00E5FF, #00E5FF)' }}
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlcyIgeD0iMCI yeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBRMjUgNSA1MCAxMFQxMDAgMTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC4zIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3dhdmVzKSIvPjwvc3ZnPg==')] opacity-30"></div>
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                            <div className="text-4xl font-bold text-white drop-shadow-lg">
                                {waterGlasses}/{waterGoal}
                            </div>
                            <div className="text-sm text-white/80">glasses</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={removeWater}
                        className="h-10 w-10 rounded-full border-cyan-400/30 hover:bg-cyan-500/10"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        onClick={addWater}
                        className="h-12 w-12 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #7B5CFF 100%)' }}
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
