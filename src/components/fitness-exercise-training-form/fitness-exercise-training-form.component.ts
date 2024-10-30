import { Component } from '@angular/core';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';
import { CommonModule } from '@angular/common';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';

@Component({
  selector: 'app-fitness-exercise-training-form',
  standalone: true,
  imports: [FitnessButtonComponent, CommonModule, PRIMENG_COMPONENTS],
  templateUrl: './fitness-exercise-training-form.component.html',
  styleUrl: './fitness-exercise-training-form.component.scss',
})
export class FitnessExerciseTrainingFormComponent {
  i: any;
  activeFilterMenu: any;
  searchExercise(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onFilterExercise(arg0: any) {
    throw new Error('Method not implemented.');
  }
  exercise: any;
  filterExercise: any;
  selectExercise(_t8: any, arg1: any) {
    throw new Error('Method not implemented.');
  }
  saveExercise(arg0: any) {
    throw new Error('Method not implemented.');
  }
  deleteExercise(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editExercise(arg0: any) {
    throw new Error('Method not implemented.');
  }
  hideBtn: any;
  addExercise() {
    throw new Error('Method not implemented.');
  }
}
