"use client";

import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatRing } from "@/components/dashboard/StatRing";
import { WaterTracker } from "@/components/dashboard/WaterTracker";
import { WorkoutVideos } from "@/components/dashboard/WorkoutVideos";
import { TodayWorkoutCard } from "@/components/dashboard/TodayWorkoutCard";
import { StreakTracker } from "@/components/dashboard/StreakTracker";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { SocialProof } from "@/components/dashboard/SocialProof";
import { ThemeCustomizer } from "@/components/dashboard/ThemeCustomizer";
import { MusicPlayer } from "@/components/dashboard/MusicPlayer";
import { AddActivityDialog } from "@/components/forms/AddActivityDialog";
import { useFitnessStore } from "@/store/fitness-store";
import { Flame, Footprints, Timer, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const stats = useFitnessStore((state) => state.stats);
  const hasCompletedOnboarding = useFitnessStore((state) => state.hasCompletedOnboarding);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-12 pb-24"
    >
      {/* Header Section */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
        <div className="space-y-6">
          <SocialProof />
          <div className="space-y-2">
            <h2 className="text-7xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-white/20 bg-clip-text text-transparent uppercase italic leading-none">
              Control <span className="text-purple-500">Center</span>
            </h2>
            <div className="flex items-center gap-3 ml-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Elite Rank</span>
              </div>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">User_402 • Current Cycle: Phase 4</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <AddActivityDialog />
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Primary Content Column */}
        <div className="lg:col-span-8 space-y-10">
          <motion.div variants={item}>
            {hasCompletedOnboarding && <TodayWorkoutCard />}
          </motion.div>

          <motion.div variants={item}>
            <MoodSelector />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={item}>
              <WaterTracker />
            </motion.div>
            <motion.div variants={item} className="p-8 rounded-[2.5rem] glass-4k border border-white/5 bg-gradient-to-br from-cyan-500/10 to-transparent flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Timer className="h-20 w-20 text-cyan-400" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400/60 mb-2">Active Bio-Time</h4>
              <div className="text-6xl font-black italic text-white tracking-tighter">
                42<span className="text-2xl text-cyan-400/50 not-italic ml-1">min</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full mt-6 overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                />
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ActivityChart />
            <RecentActivity />
          </motion.div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
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

      {/* Analytics & Insights Section */}
      <motion.div variants={item} className="space-y-8 pt-10 border-t border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter">Bio-Metrics Analytics</h3>
          <div className="h-px flex-1 mx-8 bg-white/5" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatRing
            label="Calories"
            value={stats.calories}
            max={2500}
            unit="kcal"
            color="#ef4444"
            icon={<Flame className="h-5 w-5 text-red-500" />}
          />
          <StatRing
            label="Steps"
            value={stats.steps}
            max={10000}
            unit="steps"
            color="#3b82f6"
            icon={<Footprints className="h-5 w-5 text-blue-500" />}
          />
          <StatRing
            label="Move Min"
            value={stats.moveMin}
            max={60}
            unit="min"
            color="#22c55e"
            icon={<Timer className="h-5 w-5 text-green-500" />}
          />
        </div>
      </motion.div>

      <motion.div variants={item}>
        <WorkoutVideos />
      </motion.div>
    </motion.div>
  );
}
