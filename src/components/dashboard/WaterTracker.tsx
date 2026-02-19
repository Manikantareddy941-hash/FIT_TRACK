"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Plus, Minus, Waves } from "lucide-react";
import { useFitnessStore } from "@/store/fitness-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WaterTracker() {
  const waterGlasses = useFitnessStore((state) => state.waterGlasses);
  const waterGoal = useFitnessStore((state) => state.waterGoal);
  const addWater = useFitnessStore((state) => state.addWater);
  const removeWater = useFitnessStore((state) => state.removeWater);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const percentage = Math.min((waterGlasses / waterGoal) * 100, 100);

  return (
    <Card className="relative overflow-hidden glass-4k shadow-2xl p-0 border-none group rounded-[2.5rem]">
      <CardHeader className="relative pb-0">
        <CardTitle className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-accent">
          <Droplet className="h-4 w-4" />
          Hydration Log
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-6 relative">
        <div className="relative h-64 w-full rounded-[3rem] glass-4k border-none overflow-hidden group/tank shadow-none">
          <motion.div
            className="absolute bottom-0 w-full bg-gradient-to-t from-primary/60 via-primary/40 to-accent/30"
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="absolute top-0 left-0 w-full h-12 -translate-y-1/2 overflow-hidden pointer-events-none">
              <motion.div
                className="w-[300%] h-full opacity-40 flex"
                animate={{ x: ["-66.6%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <Waves className="h-full w-1/3 text-primary/50" />
                <Waves className="h-full w-1/3 text-primary/50" />
                <Waves className="h-full w-1/3 text-primary/50" />
              </motion.div>
            </div>

            <AnimatePresence>
              {mounted && waterGlasses > 0 && (
                <motion.div
                  key={`particles-${waterGlasses}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        y: "100%",
                        x: `${Math.random() * 100}%`,
                        scale: 0,
                      }}
                      animate={{
                        y: "-10%",
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                      className="absolute h-1 w-1 rounded-full bg-white/40"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <motion.div
              key={waterGlasses}
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative"
            >
              <div className="text-7xl font-black italic tracking-tighter text-foreground drop-shadow-sm">
                {waterGlasses}
                <span className="text-2xl text-accent/50 not-italic ml-2 tracking-widest uppercase">
                  /{waterGoal}
                </span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/70 mt-2">
                Units Consumed
              </div>
            </motion.div>
          </div>

          <div className="absolute top-6 right-8 z-10">
            <div className="text-[10px] font-black italic text-foreground/40 tracking-widest uppercase">
              {Math.round(percentage)}% Full
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 glass-4k p-2 rounded-3xl">
          <Button
            size="icon"
            variant="ghost"
            onClick={removeWater}
            className="h-12 w-12 rounded-2xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Minus className="h-5 w-5" />
          </Button>

          <div className="h-8 w-px bg-black/5" />

          <Button
            onClick={addWater}
            className="flex-1 h-14 rounded-2xl gradient-primary neon-glow font-black italic uppercase tracking-wider text-sm shadow-xl hover:scale-[1.02] transition-transform"
          >
            <Plus className="h-5 w-5 mr-1" />
            Inject H2O
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
