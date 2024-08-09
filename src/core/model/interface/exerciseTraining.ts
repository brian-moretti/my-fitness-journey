export interface IExerciseTraining {
  id_exercise?: number;
  id_program?: number;
  series?: number;
  reps?: number;
  rest?: Date;
  weight?: number;
  weight_max_rm?: number;
  video?: string;
}
