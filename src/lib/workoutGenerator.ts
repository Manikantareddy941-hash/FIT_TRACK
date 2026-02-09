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
            moodIntensity: 3,
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
            moodIntensity: 3,
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
            moodIntensity: 2,
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
            moodIntensity: 3,
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
            moodIntensity: 5,
        },
        {
            id: 'm1',
            name: 'Child’s Pose',
            duration: 60,
            sets: 2,
            restTime: 10,
            instructions: 'Kneel on the floor, sit on your heels, and reach arms forward.',
            muscleGroup: 'Lower Back, Relaxation',
            equipment: 'none',
            moodIntensity: 1,
        },
        {
            id: 'm2',
            name: 'High Knees',
            duration: 45,
            sets: 3,
            restTime: 30,
            instructions: 'Run in place, bringing knees as high as possible.',
            muscleGroup: 'Full Body, Cardio',
            equipment: 'none',
            moodIntensity: 5,
        },
    ],
    // ... adding more mood intensities
};

export function generateWorkoutPlan(profile: UserProfile): WorkoutPlan {
    const { level, equipment, timeAvailable, goal, currentMood } = profile;

    // Select exercise pool based on level and equipment
    const key = `${level}_${equipment}`;
    let exercises = exerciseDatabase[key] || exerciseDatabase.beginner_home;

    // Mood adaptation logic
    if (currentMood) {
        if (currentMood === 'energized' || currentMood === 'focused') {
            // Prioritize higher intensity
            exercises = [...exercises].sort((a, b) => (b.moodIntensity || 3) - (a.moodIntensity || 3));
        } else if (currentMood === 'tired' || currentMood === 'stressed' || currentMood === 'unmotivated') {
            // Prioritize lower intensity / restorative
            exercises = [...exercises].sort((a, b) => (a.moodIntensity || 3) - (b.moodIntensity || 3));
        }
    }

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
        name: currentMood
            ? `${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} ${level.charAt(0).toUpperCase() + level.slice(1)} Session`
            : `${level.charAt(0).toUpperCase() + level.slice(1)} Workout`,
        level,
        exercises,
        totalDuration: Math.round(totalDuration),
        caloriesBurn,
        moodType: currentMood,
    };
}
