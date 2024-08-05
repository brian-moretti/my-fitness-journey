export interface IExercise {
  id: number;
  name: string;
  target: string;
  gifUrl?: string;
  instructions?: string[];
  bodyPart: string;
  secondaryMuscles?: string[];
  equipment?: string;
}
