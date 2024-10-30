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
import { FitnessExerciseTrainingFormComponent } from '../../components/fitness-exercise-training-form/fitness-exercise-training-form.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PRIMENG_COMPONENTS,
    FitnessButtonComponent,
    FitnessFilterComponent,
    FitnessExerciseTrainingFormComponent,
  ],
  providers: [MessageService],
  templateUrl: './fitness-program-trainings.component.html',
  styleUrl: './fitness-program-trainings.component.scss',
})
export class FitnessProgramTrainingsComponent implements OnInit {
  titlecase: TitleCasePipe = new TitleCasePipe();
  trainingsForm!: FormGroup;
  programInfo: ITrainingProgram = {};
  training!: IExerciseTraining;

  trainingAddToProgram: IExerciseTraining[] = [];

  exercisesList: IExercise[] = [];
  filterExercise: IExercise[] = [];

  activeFilterMenu: number | null = null;
  activeSubmit: boolean = false;

  hideBtn: boolean = true;
  isEditable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private exerciseTrainingService: ExercisesTrainingService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.programInfo = history.state;
    this.trainingsForm = this.formBuilder.group({
      exercises: this.formBuilder.array([this.createExercise()]),
    });
    console.log(this.programInfo);
  }

  get exercises(): FormArray {
    return this.trainingsForm.get('exercises') as FormArray;
  }

  createExercise(): FormGroup {
    return this.formBuilder.group({
      id_scheda: [this.programInfo.id || 11], //! to remove
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
    this._enableSubmitBtn();
    this.hideBtn = true;
  }

  searchExercise(index: number) {
    this.activeFilterMenu = index;
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
    if (!key) {
      this.filterExercise = [];
    }
  }

  selectExercise(exercise: IExercise, index: number) {
    this.exercises.controls[index].patchValue({
      exercise: exercise.name,
      id_exercise: exercise.id,
    });
    this.filterExercise = [];
    this.activeFilterMenu = null;
    console.log(this.exercises);
  }

  editExercise(index: number) {
    this.exercises.at(index).enable();
    this.hideBtn = true;
    this._enableSubmitBtn();
  }

  saveExercise(index: number) {
    //! SAVE EXE DENTR ARRAY/OBJ E AL SUBMIT INVIARE MASSIVAMENTE
    const exercise = this.exercises.at(index) as FormGroup;
    exercise.value.rest = exercise.value.rest.padStart(8, '00:');
    //? Remove exe.name control???
    if (exercise.valid) {
      this.trainingAddToProgram.push(exercise.value);
      if (this.exercises.controls.length - 1 === index) {
        this.hideBtn = false;
      }
      exercise.disable();
    }
    this._enableSubmitBtn();
  }

  deleteExercise(index: number) {
    this.trainingAddToProgram.splice(index, 1);
    if (this.exercises.length > 1) {
      return this.exercises.removeAt(index);
    }
    this.exercises.at(index).reset();
    this.exercises.at(index).enable();
    this.hideBtn = true;
    this._enableSubmitBtn();
  }

  onSubmit() {
    this.trainingAddToProgram.forEach((training) => {
      this.exerciseTrainingService.createExerciseTraining(training).subscribe({
        next: (exercise: IExerciseTraining) => {
          console.log(exercise); // b/end return
          this.messageService.add({
            severity: 'success',
            summary: 'Program Trainings Build',
            detail: "Let's grow your muscles",
            life: 2500,
          });
        },
        error: () => {},
      });
    });
  }

  redirect() {
    this.router.navigate([`program/${this.programInfo.id}`]);
  }

  private _enableSubmitBtn() {
    this.exercises.controls.forEach((c) => (this.activeSubmit = c.disabled));
  }
}
