import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FitnessButtonComponent } from '../../components/fitness-button/fitness-button.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise } from '../../core/model';
import { IExerciseRouterState } from '../../core/model/interface/exerciseRouterState';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';
import { bodyParts, IBodyParts } from '../../utilities/bodyParts';
import { equipments, IEquipment } from '../../utilities/equipment';
import { IMuscles, muscles } from '../../utilities/muscles';
import { ITargets, targets } from '../../utilities/targets';

@Component({
  standalone: true,
  imports: [
    ...PRIMENG_COMPONENTS,
    CommonModule,
    FitnessButtonComponent,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './fitness-exercise-form.component.html',
  styleUrl: './fitness-exercise-form.component.scss',
})
export class FitnessExerciseFormComponent implements OnInit {
  exercisesForm!: FormGroup;
  targets: ITargets[] = [];
  bodyParts: IBodyParts[] = [];
  equipments: IEquipment[] = [];
  secondaryMuscles: IMuscles[] = [];
  action: string = '';
  exerciseRouterState: IExerciseRouterState = {};
  exerciseToUpdate: IExercise | undefined;
  errorMessage: string = '';

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    private interceptor: HttpErrorsService,
    private toast: MessageService
  ) {}

  ngOnInit(): void {
    this._getSingleExercise();
    this._getRouterState();
    this._getInterfaceData();
    const { target, bodyPart, instructions, secondaryMuscles, equipment } =
      this._mapFormElement();

    this.exercisesForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      target: new FormControl<ITargets | null>(null, Validators.required),
      bodyPart: new FormControl<IBodyParts | null>(null, Validators.required),
      instructions: new FormControl<string | null>(null),
      secondaryMuscles: new FormControl<IMuscles | null>(null),
      equipment: new FormControl<IEquipment | null>(null),
    });

    if (this.exerciseToUpdate) {
      this.exercisesForm.patchValue({
        name: this._titleCaseTransform(this.exerciseToUpdate.name),
        target,
        bodyPart,
        instructions,
        secondaryMuscles,
        equipment,
      });
    }
  }

  private _titleCaseTransform(value: string) {
    const titlecase = new TitleCasePipe();
    return titlecase.transform(value);
  }

  private _getRouterState() {
    this.exerciseRouterState = history.state;
    this.exerciseToUpdate = this.exerciseRouterState.exercise;
    this.action = this.exerciseRouterState.mode || 'CREATE';
  }

  private _getInterfaceData() {
    this.targets = targets;
    this.bodyParts = bodyParts;
    this.equipments = equipments;
    this.secondaryMuscles = muscles.sort((a, b) =>
      a.muscle > b.muscle ? 1 : -1
    );
  }

  private _mapFormElement() {
    const target = this.targets.find(
      (target) =>
        target.target.toLowerCase() ===
        this.exerciseToUpdate?.target.toLowerCase()
    );

    const bodyPart = bodyParts.find(
      (bodyPart) =>
        bodyPart.bodyPart.toLowerCase() ===
        this.exerciseToUpdate?.bodyPart.toLowerCase()
    );
    const instructions = this.exerciseToUpdate?.instructions
      ?.join(' ')
      .replaceAll('<br/>', '');

    const muscleToFind = this.exerciseToUpdate?.secondaryMuscles
      ?.at(0)
      ?.split(' | ')
      .map((muscle) => muscle.trim());

    const secondaryMuscles = this.secondaryMuscles.filter((muscle) =>
      muscleToFind?.includes(muscle.muscle)
    );

    const equipment = this.equipments.find(
      (equipment) =>
        equipment.equipment.toLowerCase() ===
        this.exerciseToUpdate?.equipment?.toLowerCase()
    );

    return { target, bodyPart, instructions, secondaryMuscles, equipment };
  }

  //?
  private _getSingleExercise() {
    this.exerciseService.getSingleExercise(1500).subscribe((data) => {
      console.log(data);
    });
  }

  get nameControl() {
    return this.exercisesForm.get('name') as FormControl;
  }
  get targetControl() {
    return this.exercisesForm.get('target') as FormControl;
  }
  get bodyPartControl() {
    return this.exercisesForm.get('bodyPart') as FormControl;
  }

  onSubmitNewExercise(form: FormGroup) {
    const exerciseToAdd: IExercise = this._onMappingExerciseForm(form);
    console.log(exerciseToAdd);

    this.exerciseService.createExerciseUsingPost(exerciseToAdd).subscribe({
      next: (exercise) => {
        this.router.navigate(['/exercises', {}])
        //! OK POST - ESEGUIRE NAVIGAZIONE
        //! TOGLIERE IMG SE NON PRESENTE HTML
        this.toast.add({
          severity: 'success',
          summary: 'Exercise Created',
          detail: exercise.name,
        });
        form.reset();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleExerciseError(err);
        this.toast.add({
          severity: 'error',
          summary: 'Submit error',
          detail: this.errorMessage,
        });
      },
    });
  }

  onSubmitUpdateExercise(form: FormGroup) {
    const exerciseToUpdate = this._onMappingExerciseForm(form);
    this.exerciseService.updateExerciseUsingPut(exerciseToUpdate).subscribe({
      next: (updatedExercise) => {
        this.toast.add({
          severity: 'success',
          summary: 'Exercise',
          detail: `${updatedExercise.name} updated`,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleExerciseError(err);
        this.toast.add({
          severity: 'error',
          summary: 'Update Error',
          detail: this.errorMessage,
        });
      },
    });
  }

  private _onMappingExerciseForm(form: FormGroup): IExercise {
    const instructions: string[] | undefined = form.value.instructions
      ? form.value.instructions.trim().split('.')
      : undefined;
    console.log(instructions);

    const secondaryMuscles: string[] | undefined = form.value.secondaryMuscles
      ? form.value.secondaryMuscles
          .flatMap((muscle: { muscle: string }) => Object.values(muscle))
          .sort((a: string, b: string) => (a > b ? 1 : -1))
      : undefined;
    const equipment: string | undefined = form.value.equipment
      ? form.value.equipment.equipment
      : undefined;
    return {
      id: this.exerciseToUpdate!.id,
      name: form.value.name,
      target: form.value.target.target,
      instructions,
      bodyPart: form.value.bodyPart.bodyPart,
      secondaryMuscles,
      equipment,
    };
  }
}
