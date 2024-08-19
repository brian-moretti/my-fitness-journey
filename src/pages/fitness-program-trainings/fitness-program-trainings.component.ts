import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FitnessButtonComponent } from '../../components/fitness-button/fitness-button.component';
import { FitnessFilterComponent } from '../../components/fitness-filter/fitness-filter.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise } from '../../core/model';
import { IExerciseTraining } from '../../core/model/interface/exerciseTraining';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { ExercisesTrainingService } from '../../services/exercises-training/exercises-training.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PRIMENG_COMPONENTS,
    FitnessButtonComponent,
    FitnessFilterComponent,
  ],
  templateUrl: './fitness-program-trainings.component.html',
  styleUrl: './fitness-program-trainings.component.scss',
})
export class FitnessProgramTrainingsComponent implements OnInit {
  titlecase: TitleCasePipe = new TitleCasePipe();
  trainingsForm!: FormGroup;
  programInfo: ITrainingProgram = {};
  training: IExerciseTraining = {};
  exercisesList: IExercise[] = [];
  filterExercise: IExercise[] = [];
  hideBtn: boolean = true;
  isEditable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private exerciseTrainingService: ExercisesTrainingService
  ) {}

  ngOnInit(): void {
    this.programInfo = history.state;
    this.trainingsForm = this.formBuilder.group({
      exercises: this.formBuilder.array([this.createExercise()]),
    });
  }

  get exercises(): FormArray {
    return this.trainingsForm.get('exercises') as FormArray;
  }

  createExercise(): FormGroup {
    return this.formBuilder.group({
      id_scheda: [this.programInfo.id || 7], //! to remove
      id_exercise: [],
      exercise: [''],
      reps: [],
      series: [],
      rest: [''],
      weight: [],
      weight_max_rm: [],
      video: [''],
    });
  }

  addExercise() {
    this.exercises.push(this.createExercise());
  }

  searchExercise() {
    this.exerciseService.getExercises().subscribe({
      next: (exercises) => {
        this.exercisesList = exercises.map((exercise) => ({
          ...exercise,
          name: this.titlecase.transform(exercise.name.replaceAll('_', ' ')),
        }));
      },
      error: () => {},
    });
  }

  onFilterExercise(key: string) {
    this.filterExercise = this.exercisesList.filter((exercise) =>
      exercise.name.toLowerCase().startsWith(key.toLowerCase())
    );
  }

  selectExercise(exercise: IExercise, index: number) {
    this.exercises.controls[index].patchValue({
      exercise: exercise.name,
      id_exercise: exercise.id,
    });
    console.log(this.exercises);
  }

  editExercise(index: number) {
    this.exercises.at(index).enable();
  }

  saveExercise(index: number) {
    const exercise = this.exercises.at(index) as FormGroup;
    exercise.value.rest = exercise.value.rest.padStart(8, '00:');
    //? Remove exe.name control???
    console.log(exercise);

    this.training = exercise.value;
    if (exercise.valid) {
      // exercise.disable();
      this.exerciseTrainingService
        .createExerciseTraining(this.training)
        .subscribe({
          next: (training) => {
            console.log(training);
          },
          error: () => {},
        });
    }
    this.hideBtn = false;
  }

  deleteExercise(index: number) {
    if (this.exercises.length > 1) {
      return this.exercises.removeAt(index);
    }
    this.exercises.at(index).reset();
    this.exercises.at(index).enable();
    this.hideBtn = true;
  }

  onSubmit() {
    console.log(this.trainingsForm.value);
  }
}
