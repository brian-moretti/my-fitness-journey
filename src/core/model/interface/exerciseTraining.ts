import { IExercise } from './exercises';

export interface IExerciseTraining {
  series?: number;
  reps?: number;
  rest?: string;
  weight?: number;
  weight_max_rm?: number;
  video?: string;
  exercise?: IExercise;
  id_program?: number;
}
