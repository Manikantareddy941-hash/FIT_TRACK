import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Activity, DailyStats, UserProfile, WorkoutPlan, WorkoutSession, ProgressData, UserMood, ThemeSettings, ActiveSessionState, TrackingPoint } from '@/lib/types';

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
    setUserMood: (mood: UserMood) => void;
    setThemeSettings: (settings: ThemeSettings) => void;

    // New - Workouts
    currentWorkoutPlan: WorkoutPlan | null;
    todayWorkout: WorkoutPlan | null;
    workoutSessions: WorkoutSession[];
    setWorkoutPlan: (plan: WorkoutPlan) => void;
    startWorkout: (planId: string) => void;
    completeWorkout: (sessionId: string, caloriesBurned: number) => void;

    // New - Progress
    progress: ProgressData;
    activeSession: ActiveSessionState;
    updateWeight: (weight: number) => void;
    updateSocialCount: () => void;

    // Tracking Actions
    startActiveSession: () => void;
    updateActiveLocation: (lat: number, lng: number, accuracy: number) => void;
    finishActiveSession: () => void;
    checkDailyReset: () => void;

    // New - Settings Engine
    lastResetDate: string | null;
    toggleUnits: () => void;
    resetData: () => void;

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
            setUserMood: (mood) => set((state) => ({
                userProfile: state.userProfile ? { ...state.userProfile, currentMood: mood } : null
            })),
            setThemeSettings: (settings) => set((state) => ({
                userProfile: state.userProfile ? { ...state.userProfile, themeSettings: settings } : null
            })),

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
                socialCount: 1420,
                totalDistance: 0,
                totalActiveCalories: 0,
            },
            activeSession: {
                isActive: false,
                startTime: null,
                path: [],
                distance: 0,
                currentVelocity: 0,
                estimatedSteps: 0,
                burnedCalories: 0,
            },
            startActiveSession: () => set({
                activeSession: {
                    isActive: true,
                    startTime: Date.now(),
                    path: [],
                    distance: 0,
                    currentVelocity: 0,
                    estimatedSteps: 0,
                    burnedCalories: 0,
                }
            }),
            updateActiveLocation: (lat, lng, accuracy) => set((state) => {
                const newPoint: TrackingPoint = { latitude: lat, longitude: lng, timestamp: Date.now(), accuracy };
                const lastPoint = state.activeSession.path[state.activeSession.path.length - 1];

                let additionalDistance = 0;
                let velocity = 0;

                if (lastPoint) {
                    // Haversine formula for distance calculation
                    const R = 6371e3; // metres
                    const φ1 = lastPoint.latitude * Math.PI / 180;
                    const φ2 = lat * Math.PI / 180;
                    const Δφ = (lat - lastPoint.latitude) * Math.PI / 180;
                    const Δλ = (lng - lastPoint.longitude) * Math.PI / 180;

                    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    additionalDistance = R * c;

                    // Only add distance if movement is significant (e.g., > 2m) to avoid GPS jitter
                    if (additionalDistance < 2) additionalDistance = 0;

                    const timeDiff = (newPoint.timestamp - lastPoint.timestamp) / 1000;
                    velocity = timeDiff > 0 ? additionalDistance / timeDiff : 0;
                }

                const newDistance = state.activeSession.distance + additionalDistance;

                // Calorie calculation (MET-based)
                const weight = state.userProfile?.weight ?? 75;
                const hours = (Date.now() - (state.activeSession.startTime || Date.now())) / 3600000;
                const activeMET = velocity > 1.5 ? 8.0 : 4.0; // 8.0 for running, 4.0 for walking
                const calories = activeMET * weight * hours;

                // Stride-based step estimation: stride = height * 0.414
                const height = state.userProfile?.height ?? 175;
                const stride = (height * 0.414) / 100; // in meters
                const steps = Math.floor(newDistance / stride);

                return {
                    activeSession: {
                        ...state.activeSession,
                        path: [...state.activeSession.path, newPoint],
                        distance: newDistance,
                        currentVelocity: velocity,
                        estimatedSteps: steps,
                        burnedCalories: Math.floor(calories),
                    }
                };
            }),
            finishActiveSession: () => set((state) => {
                const session = state.activeSession;
                if (!session.isActive) return state;

                return {
                    progress: {
                        ...state.progress,
                        totalDistance: state.progress.totalDistance + session.distance,
                        totalActiveCalories: state.progress.totalActiveCalories + session.burnedCalories,
                    },
                    activeSession: {
                        ...state.activeSession,
                        isActive: false,
                    }
                };
            }),
            checkDailyReset: () => {
                const today = new Date().toDateString();
                set((state) => {
                    if (state.lastResetDate !== today) {
                        return {
                            lastResetDate: today,
                            stats: {
                                calories: 0,
                                steps: 0,
                                moveMin: 0,
                            },
                        };
                    }
                    return state;
                });
            },
            updateSocialCount: () => set((state) => ({
                progress: {
                    ...state.progress,
                    socialCount: (state.progress?.socialCount ?? 1420) + Math.floor(Math.random() * 5)
                }
            })),
            lastResetDate: null,
            updateWeight: (weight) => {
                set((state) => ({
                    progress: {
                        ...state.progress,
                        weightHistory: [
                            ...state.progress.weightHistory,
                            { date: new Date(), weight },
                        ],
                    },
                    userProfile: state.userProfile ? { ...state.userProfile, weight } : null
                }));
            },

            // Settings Engine
            toggleUnits: () => set((state) => ({
                userProfile: state.userProfile
                    ? { ...state.userProfile, units: state.userProfile.units === 'metric' ? 'imperial' : 'metric' }
                    : null
            })),
            resetData: () => {
                localStorage.removeItem('fittrack-storage');
                window.location.reload();
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
