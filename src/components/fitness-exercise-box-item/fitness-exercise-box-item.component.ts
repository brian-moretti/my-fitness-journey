import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise } from '../../core/model';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';

@Component({
  selector: 'app-fitness-exercise-box-item',
  standalone: true,
  imports: [CommonModule, FitnessButtonComponent, ...PRIMENG_COMPONENTS],
  providers: [MessageService, ConfirmationService],
  templateUrl: './fitness-exercise-box-item.component.html',
  styleUrl: './fitness-exercise-box-item.component.scss',
})
export class FitnessExerciseBoxItemComponent implements OnInit {
  @Input() exercise!: IExercise;
  @Output() deletedExercise: EventEmitter<IExercise> = new EventEmitter();

  showMoreInfoExercise: boolean = false;
  noImage: boolean = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    if (this.exercise.gifUrl?.includes('undefined')) {
      this.noImage = true;
    }
  }

  onShowMore() {
    this.showMoreInfoExercise = true;
  }

  onEditExercise(exercise: IExercise) {
    this.router.navigate(['/exercise-form'], {
      state: { exercise, mode: 'UPDATE' },
    });
  }

  alertDialogue(event: Event, exercise: IExercise) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you really want to delete this exercise?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      defaultFocus: 'none',
      accept: () => {
        this.messageService.add({
          key: 'success',
          severity: 'success',
          summary: `Exercise  Deleted`,
          detail: `${exercise.name} has been deleted`,
          life: 2000,
        });
        this.showMoreInfoExercise = false;
      },
      reject: () => {
        this.messageService.add({
          key: 'reject',
          severity: 'info',
          summary: 'Stay Hard',
          detail: 'Maybe this exercise can still help you',
          life: 2000,
        });
      },
    });
  }

  onCloseToast(exercise: IExercise) {
    this.deletedExercise.emit(exercise);
  }
}
