import { IExerciseTraining } from './exerciseTraining';
import { IUser } from './user';

export interface ITrainingProgram {
  id?: number;
  name?: string;
  date_start?: string;
  date_end?: string;
  user?: IUser;
  trainings?: IExerciseTraining[];
}
