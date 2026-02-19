"use client";

import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { WaterTracker } from "@/components/dashboard/WaterTracker";
import { WorkoutVideos } from "@/components/dashboard/WorkoutVideos";
import { TodayWorkoutCard } from "@/components/dashboard/TodayWorkoutCard";
import { StreakTracker } from "@/components/dashboard/StreakTracker";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { SocialProof } from "@/components/dashboard/SocialProof";
import { ThemeCustomizer } from "@/components/dashboard/ThemeCustomizer";
import { MusicPlayer } from "@/components/dashboard/MusicPlayer";
import { LiveTracker } from "@/components/dashboard/LiveTracker";
import { AddActivityDialog } from "@/components/forms/AddActivityDialog";
import { StatsGlance } from "@/components/dashboard/StatsGlance";
import { Greeting } from "@/components/dashboard/Greeting";
import { useFitnessStore } from "@/store/fitness-store";
import { Timer, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const stats = useFitnessStore((state) => state.stats);
  const hasCompletedOnboarding = useFitnessStore((state) => state.hasCompletedOnboarding);
  const activeSession = useFitnessStore((state) => state.activeSession);
  const checkDailyReset = useFitnessStore((state) => state.checkDailyReset);

  useEffect(() => {
    checkDailyReset();
  }, [checkDailyReset]);

  // ✅ FIX: make calculation pure using useMemo
  const activeMinutes = useMemo(() => {
    if (activeSession.isActive && activeSession.startTime) {
      return Math.floor((Date.now() - activeSession.startTime) / 60000);
    }
    return 0;
  }, [activeSession]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-12 pb-24"
    >
      {/* Header */}
      <motion.div
        variants={item}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-10"
      >
        <div className="space-y-6">
          <SocialProof />
          <Greeting />
        </div>
        <div className="flex gap-4">
          <AddActivityDialog />
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={item}>
        <StatsGlance />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-12">
          <motion.div variants={item}>
            {hasCompletedOnboarding && <TodayWorkoutCard />}
          </motion.div>

          <motion.div variants={item}>
            <MoodSelector />
          </motion.div>

          {/* Live block */}
          <motion.div
            variants={item}
            className="p-10 rounded-[2.5rem] glass-4k flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12">
              {activeSession.isActive ? (
                <MapPin className="h-32 w-32 text-accent animate-pulse" />
              ) : (
                <Timer className="h-32 w-32 text-accent" />
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/60 mb-3 ml-1">
                  {activeSession.isActive ? "Live Satellite Link" : "Active Bio-Time"}
                </h4>

                <div className="text-8xl font-black italic text-foreground tracking-tighter leading-none">
                  {activeSession.isActive
                    ? Math.round(activeSession.distance)
                    : stats.moveMin}

                  <span className="text-2xl text-accent/40 not-italic ml-2 font-black uppercase tracking-widest">
                    {activeSession.isActive ? "m" : "min"}
                  </span>
                </div>
              </div>

              <div className="md:w-64">
                <WaterTracker />
              </div>
            </div>

            <div className="h-2 w-full bg-black/5 rounded-full mt-10 overflow-hidden border border-black/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: activeSession.isActive ? "100%" : "70%" }}
                className={`h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x shadow-[0_0_20px_rgba(var(--primary),0.3)] ${
                  activeSession.isActive ? "animate-pulse" : ""
                }`}
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ActivityChart />
            <RecentActivity />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <motion.div variants={item}>
            <MusicPlayer />
          </motion.div>
          <motion.div variants={item}>
            <StreakTracker />
          </motion.div>
          <motion.div variants={item}>
            <ThemeCustomizer />
          </motion.div>
        </div>
      </div>

      <LiveTracker />

      <motion.div variants={item}>
        <WorkoutVideos />
      </motion.div>
    </motion.div>
  );
}
