import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Activity, DailyStats, UserProfile, WorkoutPlan, WorkoutSession, ProgressData } from '@/lib/types';

interface FitnessStore {
    // Existing
    stats: DailyStats;
    activities: Activity[];
    waterGlasses: number;
    waterGoal: number;

    // New - User & Onboarding
    userProfile: UserProfile | null;
    hasCompletedOnboarding: boolean;
    setUserProfile: (profile: UserProfile) => void;
    completeOnboarding: () => void;

    // New - Workouts
    currentWorkoutPlan: WorkoutPlan | null;
    todayWorkout: WorkoutPlan | null;
    workoutSessions: WorkoutSession[];
    setWorkoutPlan: (plan: WorkoutPlan) => void;
    startWorkout: (planId: string) => void;
    completeWorkout: (sessionId: string, caloriesBurned: number) => void;

    // New - Progress
    progress: ProgressData;
    updateWeight: (weight: number) => void;

    // Existing methods
    addActivity: (activity: Omit<Activity, 'id' | 'timestamp' | 'time'>) => void;
    addWater: () => void;
    removeWater: () => void;
}

export const useFitnessStore = create<FitnessStore>()(
    persist(
        (set) => ({
            stats: {
                calories: 1240,
                steps: 5400,
                moveMin: 35,
            },
            waterGlasses: 4,
            waterGoal: 8,
            activities: [
                {
                    id: "1",
                    title: "Morning Run",
                    description: "5.2 km in 30 mins",
                    time: "2 hours ago",
                    calories: 320,
                    steps: 4000,
                    icon: "🏃",
                    color: "bg-blue-500/10 text-blue-500",
                    timestamp: Date.now() - 7200000,
                },
                {
                    id: "2",
                    title: "Cycling",
                    description: "10 km in 45 mins",
                    time: "Yesterday",
                    calories: 450,
                    steps: 0,
                    icon: "🚴",
                    color: "bg-green-500/10 text-green-500",
                    timestamp: Date.now() - 86400000,
                },
            ],

            // User & Onboarding
            userProfile: null,
            hasCompletedOnboarding: false,
            setUserProfile: (profile) => set({ userProfile: profile }),
            completeOnboarding: () => set({ hasCompletedOnboarding: true }),

            // Workouts
            currentWorkoutPlan: null,
            todayWorkout: null,
            workoutSessions: [],
            setWorkoutPlan: (plan) => set({ currentWorkoutPlan: plan, todayWorkout: plan }),
            startWorkout: (planId) => {
                const sessionId = Math.random().toString(36).substr(2, 9);
                set((state) => ({
                    workoutSessions: [
                        ...state.workoutSessions,
                        {
                            id: sessionId,
                            planId,
                            date: new Date(),
                            completed: false,
                            completedExercises: [],
                            duration: 0,
                            caloriesBurned: 0,
                        },
                    ],
                }));
            },
            completeWorkout: (sessionId, caloriesBurned) => {
                set((state) => {
                    const today = new Date().toDateString();
                    const lastWorkout = state.progress.lastWorkoutDate?.toDateString();
                    const isConsecutive = lastWorkout === new Date(Date.now() - 86400000).toDateString();

                    return {
                        workoutSessions: state.workoutSessions.map((s) =>
                            s.id === sessionId ? { ...s, completed: true, caloriesBurned } : s
                        ),
                        progress: {
                            ...state.progress,
                            streak: isConsecutive || !state.progress.lastWorkoutDate ? state.progress.streak + 1 : 1,
                            lastWorkoutDate: new Date(),
                            totalWorkouts: state.progress.totalWorkouts + 1,
                            weeklyWorkouts: state.progress.weeklyWorkouts + 1,
                            monthlyWorkouts: state.progress.monthlyWorkouts + 1,
                        },
                        stats: {
                            ...state.stats,
                            calories: state.stats.calories + caloriesBurned,
                        },
                    };
                });
            },

            // Progress
            progress: {
                streak: 0,
                lastWorkoutDate: null,
                totalWorkouts: 0,
                weeklyWorkouts: 0,
                monthlyWorkouts: 0,
                weightHistory: [],
            },
            updateWeight: (weight) => {
                set((state) => ({
                    progress: {
                        ...state.progress,
                        weightHistory: [
                            ...state.progress.weightHistory,
                            { date: new Date(), weight },
                        ],
                    },
                }));
            },

            // Existing methods
            addActivity: (newActivity) =>
                set((state) => {
                    const activity: Activity = {
                        ...newActivity,
                        id: Math.random().toString(36).substr(2, 9),
                        timestamp: Date.now(),
                        time: "Just now",
                    };

                    return {
                        activities: [activity, ...state.activities],
                        stats: {
                            calories: state.stats.calories + (newActivity.calories || 0),
                            steps: state.stats.steps + (newActivity.steps || 0),
                            moveMin: state.stats.moveMin + (parseInt(newActivity.description) || 0),
                        }
                    };
                }),
            addWater: () =>
                set((state) => ({
                    waterGlasses: Math.min(state.waterGlasses + 1, state.waterGoal + 4),
                })),
            removeWater: () =>
                set((state) => ({
                    waterGlasses: Math.max(state.waterGlasses - 1, 0),
                })),
        }),
        {
            name: 'fittrack-storage',
        }
    )
);
