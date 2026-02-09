import { UserProfile, WorkoutPlan, Exercise } from '@/lib/types';

// Exercise database
const exerciseDatabase: Record<string, Exercise[]> = {
    beginner_home: [
        {
            id: '1',
            name: 'Push-ups',
            reps: 10,
            sets: 3,
            restTime: 60,
            instructions: 'Keep your body straight, lower chest to ground, push back up',
            muscleGroup: 'Chest, Triceps',
            equipment: 'none',
        },
        {
            id: '2',
            name: 'Squats',
            reps: 15,
            sets: 3,
            restTime: 60,
            instructions: 'Feet shoulder-width apart, lower hips back and down, stand back up',
            muscleGroup: 'Legs, Glutes',
            equipment: 'none',
        },
        {
            id: '3',
            name: 'Plank',
            duration: 30,
            sets: 3,
            restTime: 45,
            instructions: 'Hold body straight in push-up position, engage core',
            muscleGroup: 'Core',
            equipment: 'none',
        },
        {
            id: '4',
            name: 'Lunges',
            reps: 10,
            sets: 3,
            restTime: 60,
            instructions: 'Step forward, lower back knee, return to start',
            muscleGroup: 'Legs, Glutes',
            equipment: 'none',
        },
        {
            id: '5',
            name: 'Mountain Climbers',
            duration: 30,
            sets: 3,
            restTime: 45,
            instructions: 'In plank position, alternate bringing knees to chest quickly',
            muscleGroup: 'Core, Cardio',
            equipment: 'none',
        },
    ],
    beginner_gym: [
        {
            id: '6',
            name: 'Dumbbell Bench Press',
            reps: 12,
            sets: 3,
            restTime: 90,
            instructions: 'Lie on bench, press dumbbells up, lower with control',
            muscleGroup: 'Chest',
            equipment: 'dumbbells',
        },
        {
            id: '7',
            name: 'Lat Pulldown',
            reps: 12,
            sets: 3,
            restTime: 90,
            instructions: 'Pull bar down to chest, control the return',
            muscleGroup: 'Back',
            equipment: 'machine',
        },
        {
            id: '8',
            name: 'Leg Press',
            reps: 15,
            sets: 3,
            restTime: 90,
            instructions: 'Push platform with feet, lower with control',
            muscleGroup: 'Legs',
            equipment: 'machine',
        },
    ],
    intermediate_home: [
        {
            id: '9',
            name: 'Diamond Push-ups',
            reps: 12,
            sets: 4,
            restTime: 60,
            instructions: 'Hands close together forming diamond, lower chest, push up',
            muscleGroup: 'Triceps, Chest',
            equipment: 'none',
        },
        {
            id: '10',
            name: 'Jump Squats',
            reps: 15,
            sets: 4,
            restTime: 60,
            instructions: 'Squat down, explode up into a jump, land softly',
            muscleGroup: 'Legs, Power',
            equipment: 'none',
        },
        {
            id: '11',
            name: 'Burpees',
            reps: 10,
            sets: 4,
            restTime: 60,
            instructions: 'Drop to plank, push-up, jump feet to hands, jump up',
            muscleGroup: 'Full Body, Cardio',
            equipment: 'none',
        },
    ],
};

export function generateWorkoutPlan(profile: UserProfile): WorkoutPlan {
    const { level, equipment, timeAvailable, goal } = profile;

    // Select exercise pool based on level and equipment
    const key = `${level}_${equipment}`;
    let exercises = exerciseDatabase[key] || exerciseDatabase.beginner_home;

    // Filter exercises based on time available
    const exerciseCount = Math.floor(timeAvailable / 5); // ~5 min per exercise
    exercises = exercises.slice(0, Math.min(exerciseCount, exercises.length));

    // Calculate total duration and calories
    const totalDuration = exercises.reduce((sum, ex) => {
        const exerciseTime = (ex.duration || ex.reps! * 3) * ex.sets! + ex.restTime * (ex.sets! - 1);
        return sum + exerciseTime / 60;
    }, 0);

    const caloriesBurn = Math.round(totalDuration * 8); // ~8 cal/min estimate

    return {
        id: Math.random().toString(36).substr(2, 9),
        name: `${level.charAt(0).toUpperCase() + level.slice(1)} ${equipment.charAt(0).toUpperCase() + equipment.slice(1)} Workout`,
        level,
        exercises,
        totalDuration: Math.round(totalDuration),
        caloriesBurn,
    };
}
