export interface Activity {
    id: string;
    title: string;
    description: string;
    time: string;
    calories: number;
    steps: number;
    icon: string;
    color: string;
    timestamp: number;
}

export interface DailyStats {
    calories: number;
    steps: number;
    moveMin: number;
}

export interface UserProfile {
    age: number;
    height: number; // cm
    weight: number; // kg
    goal: 'lose_weight' | 'build_muscle' | 'stay_fit' | 'improve_endurance';
    equipment: 'home' | 'gym' | 'none';
    timeAvailable: number; // minutes per day
    level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Exercise {
    id: string;
    name: string;
    reps?: number;
    sets?: number;
    duration?: number; // seconds
    restTime: number; // seconds
    videoUrl?: string;
    instructions: string;
    muscleGroup: string;
    equipment: 'none' | 'dumbbells' | 'barbell' | 'machine';
}

export interface WorkoutPlan {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    exercises: Exercise[];
    totalDuration: number; // minutes
    caloriesBurn: number;
}

export interface WorkoutSession {
    id: string;
    planId: string;
    date: Date;
    completed: boolean;
    completedExercises: string[];
    duration: number;
    caloriesBurned: number;
}

export interface ProgressData {
    streak: number;
    lastWorkoutDate: Date | null;
    totalWorkouts: number;
    weeklyWorkouts: number;
    monthlyWorkouts: number;
    weightHistory: { date: Date; weight: number }[];
}
