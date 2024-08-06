import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise } from '../../core/model';
import { IFilters } from '../../core/model/interface/filterExercises';
import { IPagination } from '../../core/model/interface/pagination';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';
import { FitnessExerciseBoxItemComponent } from '../fitness-exercise-box-item/fitness-exercise-box-item.component';
import { FitnessFilterComponent } from '../fitness-filter/fitness-filter.component';

@Component({
  selector: 'app-fitness-exercises-list',
  standalone: true,
  imports: [
    ...PRIMENG_COMPONENTS,
    CommonModule,
    FitnessExerciseBoxItemComponent,
    FitnessFilterComponent,
    FitnessButtonComponent,
  ],
  templateUrl: './fitness-exercises-list.component.html',
  styleUrl: './fitness-exercises-list.component.scss',
})
export class FitnessExercisesListComponent implements OnChanges {
  @Input() exerciseDataList: IExercise[] = [];
  @Output() updateExerciseList: EventEmitter<IPagination> = new EventEmitter();

  exerciseList: IExercise[] = [];
  filterExercises: IExercise[] = [];
  maxElementPerPage: number = 0;
  first: number = 0;
  rows: number = 30;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exerciseDataList']) {
      this.exerciseDataList = [
        ...this._onMappingExercises(this.exerciseDataList),
      ];
    }
    this.maxElementPerPage = this.exerciseDataList.length;
    this.exerciseList = this.exerciseDataList.slice(
      this.first,
      this.first + this.rows
    );
    this.filterExercises = this.exerciseList;
  }

  private _onMappingExercises(exercises: IExercise[]) {
    return exercises.map((exercise) => {
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
          return muscle
            .split(',')
            .map((m) => m.charAt(0).toUpperCase() + m.slice(1));
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
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.rows = event.rows!;

    this.exerciseList = this.exerciseDataList.slice(
      this.first,
      this.first + this.rows
    );

    let pagination: IPagination = {
      ...event,
      maxElementPerPage: this.maxElementPerPage,
    };

    this.updateExerciseList.emit(pagination);
  }

  public onFilters(filters: IFilters) {
    const name = filters.searchName;
    const target = filters.selectedTarget;
    const bodyPart = filters.selectedBodyPart;
    const checkDatabase = filters.checkEntireDatabase;

    if (!filters) {
      this.exerciseList = this.filterExercises;
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

    console.log(this.exerciseList);

    if (target) {
      this.exerciseList = this.filterExercises.filter((exercise) =>
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
}
