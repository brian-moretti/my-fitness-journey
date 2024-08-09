import { IExerciseTraining } from './exerciseTraining';
import { IUser } from './user';

export interface ITrainingProgram {
  id?: number;
  name?: string;
  date_start?: Date;
  date_end?: Date;
  User?: IUser;
  Exercises?: IExerciseTraining[]
}

