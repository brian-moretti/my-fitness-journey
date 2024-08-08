import { IExercise } from './exercises';

export interface IExerciseRouterState {
  exercise?: IExercise;
  mode?: 'CREATE' | 'UPDATE';
}
