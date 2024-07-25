import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise, IExercises } from '../../core/model';
import { FitnessExerciseBoxItemComponent } from '../fitness-exercise-box-item/fitness-exercise-box-item.component';

@Component({
  selector: 'app-fitness-exercises-list',
  standalone: true,
  imports: [
    ...PRIMENG_COMPONENTS,
    CommonModule,
    FitnessExerciseBoxItemComponent,
  ],
  templateUrl: './fitness-exercises-list.component.html',
  styleUrl: './fitness-exercises-list.component.scss',
})
export class FitnessExercisesListComponent implements OnInit, OnChanges {
  @Input() exerciseDataList: IExercises = { Exercises: [] };
  @Output() updateExerciseList = new EventEmitter();

  exerciseList: IExercise[] = [];

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.exerciseDataList) {
      this.exerciseList = [
        ...this.exerciseList,
        ...this.exerciseDataList.Exercises,
      ];
    }
  }

  onPageChange(event: PaginatorState) {
    console.log(event);
    this.updateExerciseList.emit(event);
  }
}
