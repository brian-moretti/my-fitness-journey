import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SHARED_COMPONENTS } from '..';
import { IExercise, IExercises } from '../../core/model';
import { ExerciseService } from '../../services/exercise/exercise.service';

@Component({
  selector: 'app-fitness-exercises',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule],
  templateUrl: './fitness-exercises.component.html',
  styleUrl: './fitness-exercises.component.scss',
})
export class FitnessExercisesComponent implements OnInit {
  exercises$!: Observable<IExercises>;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.getExercise();
  }

  private getExercise() {
    this.exercises$ = this.exerciseService.getExercise().pipe(
      map((e: IExercises) => {
        e.Exercises = e.Exercises.map((e: IExercise) => {
          const name = e.name.replaceAll('_', ' ');
          const gifUrl = 'back-end/Api/' + e.gifUrl?.slice(2);
          return { ...e, name, gifUrl };
        });
        return e;
      })
    );
  }
}
