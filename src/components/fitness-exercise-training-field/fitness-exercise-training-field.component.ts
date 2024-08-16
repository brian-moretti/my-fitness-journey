import { Component, Input, OnInit } from '@angular/core';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExerciseTraining } from '../../core/model/interface/exerciseTraining';
import { ExercisesTrainingService } from '../../services/exercises-training/exercises-training.service';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fitness-exercise-training-field',
  standalone: true,
  imports: [PRIMENG_COMPONENTS, FitnessButtonComponent, CommonModule],
  templateUrl: './fitness-exercise-training-field.component.html',
  styleUrl: './fitness-exercise-training-field.component.scss',
})
export class FitnessExerciseTrainingFieldComponent implements OnInit {
  @Input() exercise: IExerciseTraining = {};
  @Input() readOnly: boolean = true;

  constructor(private exerciseTraining: ExercisesTrainingService) {}

  ngOnInit(): void {
    this._getSingleExercise();
  }

  private _getSingleExercise() {
    this.exerciseTraining
      .getSingleExerciseTraining(this.exercise.id_exercise!)
      .subscribe({
        next: (exercise) => {
          console.log(exercise);
        },
        error: () => {},
      });
  }
}
