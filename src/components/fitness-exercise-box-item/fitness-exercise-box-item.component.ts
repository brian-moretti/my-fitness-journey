import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise } from '../../core/model';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';

@Component({
  selector: 'app-fitness-exercise-box-item',
  standalone: true,
  imports: [CommonModule, FitnessButtonComponent, ...PRIMENG_COMPONENTS],
  templateUrl: './fitness-exercise-box-item.component.html',
  styleUrl: './fitness-exercise-box-item.component.scss',
})
export class FitnessExerciseBoxItemComponent {
  @Input() exercise!: IExercise;

  showMoreInfoExercise: boolean = false;

  onShowMore(event: any) {
    console.log(event);
    this.showMoreInfoExercise = true;
  }
}
