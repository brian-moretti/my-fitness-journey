import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise, IExercises } from '../../core/model';

@Component({
  selector: 'app-fitness-exercises-list',
  standalone: true,
  imports: [...PRIMENG_COMPONENTS, CommonModule],
  templateUrl: './fitness-exercises-list.component.html',
  styleUrl: './fitness-exercises-list.component.scss',
})
export class FitnessExercisesListComponent implements OnInit {
  @Input() set exerciseDataList(value: IExercises){
    if(!!value){
      value.Exercises.forEach(exercise => this.exerciseList.push(exercise)
      )
    }
  };

  exerciseList: IExercise[] = [];
  ngOnInit(): void {}
}
