import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SHARED_COMPONENTS } from '..';
import { IExercise } from '../../core/model';
import { IFilters } from '../../core/model/interface/filterExercises';
import { IPagination } from '../../core/model/interface/pagination';
import { ExerciseService } from '../../services/exercise/exercise.service';

@Component({
  selector: 'app-fitness-exercises',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule],
  templateUrl: './fitness-exercises.component.html',
  styleUrl: './fitness-exercises.component.scss',
})
export class FitnessExercisesComponent implements OnInit {
  exercises: IExercise[] = [];
  filterExercises: IExercise[] = [];
  page: number = 1;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this._getExercises();
  }

  private _getExercises() {
    this.exerciseService.getExercise(this.page).subscribe({
      next: (exercises) => {
        this.exercises = [...this.exercises, ...exercises];
        this.filterExercises = this.exercises;
      },
      error: () => {},
    });
  }

  public onUpdateExerciseList(event: IPagination) {
    let maxElementPerPage = 120 * this.page;
    if (event.first! + event.rows! >= maxElementPerPage) {
      this.page += 1;
      this._getExercises();
    }
  }

  public onFilters(filters: IFilters) {
    const name = filters.searchName;
    const target = filters.selectedTarget;
    const bodyPart = filters.selectedBodyPart;
    const checkDatabase = filters.checkEntireDatabase;

    if (!filters) {
      this.exercises = this.filterExercises;
    }

    const filterByName = this.filterExercises.filter((exercise) =>
      name ? exercise.name.includes(name.toLowerCase().trim()) : exercise
    );
    const filterByTarget = this.filterExercises.filter((exercise) =>
      target ? exercise.target.includes(target.toLowerCase().trim()) : exercise
    );
    const filterByBodyPart = this.filterExercises.filter((exercise) =>
      bodyPart
        ? exercise.bodyPart.includes(bodyPart.toLowerCase().trim())
        : exercise
    );

    if (target) {
      this.exercises = this.filterExercises.filter((exercise) =>
        exercise.target.includes(target.toLowerCase().trim())
      );
    }

    /*     this.exercises = this.filterExercises.filter((exercise) =>
      name ? exercise.name.includes(name.toLowerCase().trim()) && target ? exercise.target.includes(target.toLowerCase().trim()) && bodyPart ? exercise.bodyPart.includes(bodyPart.toLowerCase().trim())
   : : : ) */

    /*     if (name) {
      this.exercises = this.filterExercises.filter((exercise) =>
        exercise.name.includes(name.toLowerCase().trim())
      );
    }
    if (target) {
      this.exercises = this.filterExercises.filter((exercise) =>
        exercise.target.includes(target.toLowerCase().trim())
      );
    } */
  }

  public onFilterByName(name: string) {
    if (!name) {
      this.exercises = this.filterExercises;
    }
    this.exercises = this.filterExercises.filter((exercise) =>
      exercise.name.includes(name.toLowerCase().trim())
    );
  }
  public onFilterByTarget(target: string) {
    if (!target) {
      this.exercises = this.filterExercises;
    }
    this.exercises = this.filterExercises.filter((exercise) =>
      exercise.target.includes(target.toLowerCase().trim())
    );
  }
  public onFilterByBodyPart(bodyPart: string) {
    if (!bodyPart) {
      this.exercises = this.filterExercises;
    }
    this.exercises = this.filterExercises.filter((exercise) =>
      exercise.bodyPart.includes(bodyPart.toLowerCase().trim())
    );
  }
}

/*   private _exercisesSubject = new BehaviorSubject<IExercises>({
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
    
      private _getExercises(page?: number) {
    let exerciseToMap = this.exerciseService.getExercise(page);
    this._onMappingExercises(exerciseToMap).subscribe(
      (exercise: IExercises) => {
        this._exercisesSubject.next(exercise);
      }
    );
  }

  private _onMappingExercises(exercises: Observable<IExercises>) {
    return exercises.pipe(
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

    
     * 0 - 60 page 1 === 60 / 60
     * 60 - 180 page 2 === 180 / 60 - 1
     * 180 - 300 page 3 === 300 / 60 - 2
     * 300 - 420 page 4 === 420 / 60 - 3
     

       console.log(event);
    if (event.first === maxExercisePerPage) {
      let page = (event.first / maxExercisePerPage) + 1;
      let params = new HttpParams().set('page', page);
      console.log(params);
      this._getExercises();
    } 
  }

  public checkPagination(event: PaginatorState, page: number) {
    if (page === 1) {
      return 1;
    }
    return page;
  }

  onFilterByName(event: any) {
    console.log(event);
    this.exercises$
      .pipe(
        map((exercise: IExercises) => {
          exercise.Exercises = exercise.Exercises.filter((ex) => {
            console.log(ex);
            return ex.name.includes(event);
          });
          //console.log(filter);
          return exercise.Exercises;
        })
      )
      .subscribe((data) => console.log(data));
    this.exercises$.subscribe((data) => console.log(data));
  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    */
