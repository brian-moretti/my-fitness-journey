import { IExerciseTraining } from './exerciseTraining';
import { IUser } from './user';

export interface ITrainingProgram {
  id?: number;
  name?: string;
  date_start?: string | Date;
  date_end?: string | Date;
  user?: IUser;
  trainings?: IExerciseTraining[];
}
