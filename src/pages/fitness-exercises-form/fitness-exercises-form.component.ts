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
import { bodyParts, IBodyParts } from '../../utilities/bodyParts';
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
  action = 'CREATE';

  ngOnInit(): void {
    this.exercisesForm = new FormGroup({
      exerciseName: new FormControl<string>('', Validators.required),
      target: new FormControl<string>('', Validators.required),
      bodyPart: new FormControl<string>('', Validators.required),
      instructions: new FormControl<string[]>(Array.from('')),
    });
    this.targets = targets;
    this.bodyParts = bodyParts;
    console.log(this.exercisesForm);
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
    const instructions = form.value.instructions.split('.');
    console.log(instructions);

    console.log(form.value);
  }
}
