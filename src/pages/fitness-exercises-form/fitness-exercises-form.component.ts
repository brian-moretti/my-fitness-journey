import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FitnessButtonComponent } from '../../components/fitness-button/fitness-button.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise } from '../../core/model';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { bodyParts, IBodyParts } from '../../utilities/bodyParts';
import { equipment, IEquipment } from '../../utilities/equipment';
import { IMuscles, muscles } from '../../utilities/muscles';
import { ITargets, targets } from '../../utilities/targets';

@Component({
  selector: 'app-fitness-exercises-form',
  standalone: true,
  imports: [
    ...PRIMENG_COMPONENTS,
    CommonModule,
    FitnessButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './fitness-exercises-form.component.html',
  styleUrl: './fitness-exercises-form.component.scss',
})
export class FitnessExercisesFormComponent implements OnInit {
  // @Output() exerciseData: EventEmitter<> = new EventEmitter()

  exercisesForm!: FormGroup;
  targets: ITargets[] = [];
  bodyParts: IBodyParts[] = [];
  equipment: IEquipment[] = [];
  secondaryMuscles: IMuscles[] = [];
  action = 'CREATE';

  constructor(private exerciseService: ExerciseService) {}
  //! Implementare logica di UPDATE DA PULSANTE in BOX-ITEMS con invio ID
  //! LOGICA GET EXERCISE/ID E COMPILARE IL FORM CON QUEI DATI

  ngOnInit(): void {
    this.exercisesForm = new FormGroup({
      exerciseName: new FormControl<string>('', Validators.required),
      target: new FormControl<string | null>(null, Validators.required),
      bodyPart: new FormControl<string | null>(null, Validators.required),
      instructions: new FormControl<string | null>(null),
      secondaryMuscles: new FormControl<string[] | null>(null),
      equipment: new FormControl<string | null>(null),
    });
    this.targets = targets;
    this.bodyParts = bodyParts;
    this.equipment = equipment;
    this.secondaryMuscles = muscles.sort((a, b) =>
      a.muscle > b.muscle ? 1 : -1
    );
  }

  get nameControl() {
    return this.exercisesForm.get('exerciseName') as FormControl;
  }
  get targetControl() {
    return this.exercisesForm.get('target') as FormControl;
  }
  get bodyPartControl() {
    return this.exercisesForm.get('bodyPart') as FormControl;
  }

  onSubmit(form: FormGroup) {
    const instructions: string[] | undefined = form.value.instructions
      ? form.value.instructions.trim().split('.')
      : undefined;
    const secondaryMuscles: string[] | undefined = form.value.secondaryMuscles
      ? form.value.secondaryMuscles
          .flatMap((muscle: { muscle: string }) => Object.values(muscle))
          .sort((a: string, b: string) => (a > b ? 1 : -1))
      : undefined;
    const equipment = form.value.equipment
      ? form.value.equipment.equipment
      : undefined;
    const exerciseToAdd: IExercise = {
      name: form.value.exerciseName,
      target: form.value.target.target,
      instructions,
      bodyPart: form.value.bodyPart.bodyPart,
      secondaryMuscles,
      equipment,
    };
    this.exerciseService
      .createExerciseUsingPost(exerciseToAdd)
      .subscribe((exercise) => {
        //! OK POST - ESEGUIRE NAVIGAZIONE + MESSAGGIO CORRETTO INSERIMENTO
        //! GESTIRE ERRORE DUPLICATO NAME
        //! TOGLIERE IMG SE NON PRESENTE HTML
        //! CAPIRE PERCHE' DA ERRORE B/END QUANDO POST X DUPLICATO...
        console.log(exercise);
        form.reset();
      });
  }
}
