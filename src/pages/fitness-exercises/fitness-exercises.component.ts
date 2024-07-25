import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { BehaviorSubject, map, Observable, scan } from 'rxjs';
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
  private _exercisesSubject = new BehaviorSubject<IExercises>({
    Exercises: [],
  });
  exercises$: Observable<IExercises> = this._exercisesSubject
    .asObservable()
    .pipe(
      scan((acc, curr) => {
        console.log(acc, curr);
        return { ...acc, Exercises: [...acc.Exercises, ...curr.Exercises] };
      })
    );

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    //setTimeout(() => {
    this._getExercises();
    //}, 2000);
  }

  private _getExercises(page?: number) {
    this.exerciseService
      .getExercise(page)
      .pipe(
        map((e: IExercises) => {
          e.Exercises = e.Exercises.map((exercise: IExercise) => {
            const name = exercise.name.replaceAll('_', ' ');
            const gifUrl =
              'http://localhost:3000/back-end/Api/' + exercise.gifUrl?.slice(2);
            const instructions = exercise.instructions
              ?.join(' <br/>')
              .split(',');
            const secondaryMuscles = exercise.secondaryMuscles
              ?.map((muscle) => {
                if (muscle.includes(' ')) {
                  return muscle
                    .split(' ')
                    .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
                    .join(' ');
                }
                return muscle.split(',').map((m) => {
                  return m.charAt(0).toUpperCase() + m.slice(1);
                });
              })
              .join(' | ')
              .split(',');

            return {
              ...exercise,
              name,
              gifUrl,
              instructions,
              secondaryMuscles,
            };
          });
          return e;
        })
      )
      .subscribe((exercise: IExercises) => {
        this._exercisesSubject.next(exercise);
      });
  }

  private _onMappingExercises(exercises: Observable<IExercises>) {
    exercises.pipe(
      map((e: IExercises) => {
        e.Exercises = e.Exercises.map((exercise: IExercise) => {
          const name = exercise.name.replaceAll('_', ' ');
          const gifUrl =
            'http://localhost:3000/back-end/Api/' + exercise.gifUrl?.slice(2);
          const instructions = exercise.instructions?.join(' <br/>').split(',');
          const secondaryMuscles = exercise.secondaryMuscles
            ?.map((muscle) => {
              if (muscle.includes(' ')) {
                return muscle
                  .split(' ')
                  .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
                  .join(' ');
              }
              return muscle.split(',').map((m) => {
                return m.charAt(0).toUpperCase() + m.slice(1);
              });
            })
            .join(' | ')
            .split(',');

          return {
            ...exercise,
            name,
            gifUrl,
            instructions,
            secondaryMuscles,
          };
        });
        return e;
      })
    );
  }

  public onUpdateExerciseList(event: PaginatorState) {
    let maxExercisePerPage = 60;
    let page = 1; //this.checkPagination(event, );
    console.log(event);
    console.log(event.first! % maxExercisePerPage);

    if (event.first === maxExercisePerPage * page) {
      page += 1;
      this._getExercises(page);
      console.log(page);
    }

    /*
     * 0 - 60 page 1 === 60 / 60
     * 60 - 180 page 2 === 180 / 60 - 1
     * 180 - 300 page 3 === 300 / 60 - 2
     * 300 - 420 page 4 === 420 / 60 - 3
     */

    /*   console.log(event);
    if (event.first === maxExercisePerPage) {
      let page = (event.first / maxExercisePerPage) + 1;
      let params = new HttpParams().set('page', page);
      console.log(params);
      this._getExercises();
    } */
  }

  public checkPagination(event: PaginatorState, page: number) {
    if (page === 1) {
      return 1;
    }
    return page;
  }
}
