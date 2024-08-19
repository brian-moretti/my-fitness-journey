import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExerciseTraining } from '../../core/model/interface/exerciseTraining';
import { ExercisesTrainingService } from '../../services/exercises-training/exercises-training.service';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';

@Component({
  selector: 'app-fitness-exercise-training-field',
  standalone: true,
  imports: [PRIMENG_COMPONENTS, FitnessButtonComponent, CommonModule],
  templateUrl: './fitness-exercise-training-field.component.html',
  styleUrl: './fitness-exercise-training-field.component.scss',
})
export class FitnessExerciseTrainingFieldComponent implements OnInit {
  @Input() training: IExerciseTraining = {};
  @Input() readOnly: boolean = true;
  titlecase: TitleCasePipe = new TitleCasePipe();

  constructor(private exerciseTraining: ExercisesTrainingService) {}

  ngOnInit(): void {
    this._getSingleExercise();
    console.log(this.training);
    
  }

  private _getSingleExercise() {
    this.exerciseTraining
      .getSingleExerciseTraining(this.training.exercise?.id!)
      .subscribe({
        next: (exercise) => {
          console.log(exercise);
          return (this.training = {
            ...exercise,
            exercise: {
              ...exercise.exercise!,
              name: this.titlecase.transform(
                exercise.exercise?.name!.replaceAll('_', ' ')!
              ),
            },
          });
        },
        error: () => {},
      });
  }
}
