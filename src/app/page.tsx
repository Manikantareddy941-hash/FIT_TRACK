"use client";

import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatRing } from "@/components/dashboard/StatRing";
import { WaterTracker } from "@/components/dashboard/WaterTracker";
import { WorkoutVideos } from "@/components/dashboard/WorkoutVideos";
import { TodayWorkoutCard } from "@/components/dashboard/TodayWorkoutCard";
import { StreakTracker } from "@/components/dashboard/StreakTracker";
import { AddActivityDialog } from "@/components/forms/AddActivityDialog";
import { useFitnessStore } from "@/store/fitness-store";
import { Flame, Footprints, Timer } from "lucide-react";

export default function Home() {
  const stats = useFitnessStore((state) => state.stats);
  const hasCompletedOnboarding = useFitnessStore((state) => state.hasCompletedOnboarding);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-500 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Track your fitness journey</p>
        </div>
        <AddActivityDialog />
      </div>

      {hasCompletedOnboarding && <TodayWorkoutCard />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        <WaterTracker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ActivityChart />
        <RecentActivity />
        {hasCompletedOnboarding && <StreakTracker />}
      </div>

      <WorkoutVideos />
    </div>
  );
}
