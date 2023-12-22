//These types are the date sent by the API, some complements are added in the front-end

export interface Exercise {
  exerciseName: string;
  instructions: string;
  numberOfSeries: number;
  series: Series[];
}

export interface CardioExercise {
  totalTime: number;
  instructions: string;
  exerciseName: string;
}

export interface Series {
  repetition: number;
  seriesNumber: number;
  rest: number;
  weight: string;
}

export interface WarmUpExercise {
  exerciseNumber: number;
  exerciseName: string;
  instructions: string;
}

export interface SportProgram {
  dayNumber: number;
  trainingType: "full-body" | "haut du corp" | "bas du corp" | "cardio";
  warmUp: WarmUpExercise[];
  exercises: Exercise[] | CardioExercise[];
}

export interface Program {
  id: string;
  weekNumber: number;
  creationDate: string;
  sportPrograms: SportProgram[];
}

//CONSTANTS DATA

export interface Workout {
  name: string;
  traduction: string;
  description: string;
  execution: string;
  video: string;
  variant: null | string;
  gif: string;
  muscleGroups: {
    english: {
      primaryMuscleGroups: string;
      secondaryMuscleGroups: string;
    };
    french: {
      primaryMuscleGroups: string;
      secondaryMuscleGroups: string;
    };
  };
}

export interface Cardio {
  name: string;
  traduction: string;
  description: string;
  execution: string;
  video: string;
  variant: null | string;
  gif: string;
  muscleGroups: {
    english: {
      primaryMuscleGroups: string;
      secondaryMuscleGroups: string;
    };
    french: {
      primaryMuscleGroups: string;
      secondaryMuscleGroups: string;
    };
  };
}

export interface WarmUp {
  name: string;
  traduction: string;
  description: string;
  execution: string;
  video: string;
  variant: null | string;
  gif: string;
  muscleGroups: {
    english: {
      primaryMuscleGroups: string;
      secondaryMuscleGroups: string;
    };
    french: {
      primaryMuscleGroups: string;
      secondaryMuscleGroups: string;
    };
  };
}
export interface ExercisesDataList {
  training: {
    workout: Workout[];
    cardio: Cardio[];
  };
  warmUp: WarmUp[];
}
