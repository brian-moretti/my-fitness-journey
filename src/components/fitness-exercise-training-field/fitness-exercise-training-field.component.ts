import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExerciseTraining } from '../../core/model/interface/exerciseTraining';
import { ExercisesTrainingService } from '../../services/exercises-training/exercises-training.service';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';

@Component({
  selector: 'app-fitness-exercise-training-field',
  standalone: true,
  imports: [PRIMENG_COMPONENTS, FitnessButtonComponent, CommonModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './fitness-exercise-training-field.component.html',
  styleUrl: './fitness-exercise-training-field.component.scss',
})
export class FitnessExerciseTrainingFieldComponent implements OnInit {
  @Input() training!: IExerciseTraining;
  titlecase: TitleCasePipe = new TitleCasePipe();
  public correctTimeFormat: string = '';
  public editAllowed: boolean = false;
  public errorMessage: string = '';

  constructor(
    private exerciseTraining: ExercisesTrainingService,
    private toast: MessageService,
    private interceptor: HttpErrorsService
  ) {}

  ngOnInit(): void {
    this._getSingleExercise();
  }

  private _getSingleExercise() {
    this.exerciseTraining
      .getSingleExerciseTraining(this.training.id_exercise)
      .subscribe({
        next: (exercise) => {
          this.correctTimeFormat = this.training.rest.slice(3);
          return (this.training = {
            ...exercise,
            exercise: {
              ...exercise.exercise!,
              name: this.titlecase.transform(
                exercise.exercise?.name.replaceAll('_', ' ')!
              ),
            },
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.errorMessage = this.interceptor.handleExerciseTrainingError(err);
          this.toast.add({
            severity: 'error',
            detail: this.errorMessage,
          });
        },
      });
  }

  editExercise() {
    this.editAllowed = true;
  }

  saveEditExercise(training: IExerciseTraining) {
    this.editAllowed = false;
    this.exerciseTraining.updateExerciseTraining(training).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          detail: 'Training update successfully',
          life: 1500,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleExerciseTrainingError(err);
        this.toast.add({
          severity: 'error',
          detail: this.errorMessage,
        });
      },
    });
  }

  /**
   * Make a copy of the rest value on view. Create a timer and a countdown. Then use a setInterval to decrease the timer to 0. If 0 the interval will clear and the rest value will return to his original value
   * @returns {void}
   */
  public activateTimer(): void {
    let backupRest = this.correctTimeFormat;
    let countdown: any;
    let timer = this._convertTimeToNumber();
    if (countdown) {
      clearInterval(countdown);
    }
    countdown = setInterval(() => {
      timer--;
      this._updateRestTime(timer);
      if (timer <= 0) {
        clearInterval(countdown);
        this.correctTimeFormat = backupRest;
        this._endSeriesMessage();
      }
    }, 1000);
  }

  private _endSeriesMessage() {
    this.toast.add({
      severity: 'success',
      summary: 'Next Series',
      detail: "It's time to work",
      life: 5000,
    });
  }

  /**
   * Description
   * Function that convert the time from b/end (string) into number and return the sum of minutes + seconds
   * @returns {number}
   */
  private _convertTimeToNumber(): number {
    const [minutes, seconds] = this.correctTimeFormat.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  /**
   * Description
   * Give a timer transform the rest value shown on view
   * @param {timer} seconds:number
   * @returns {void}
   */
  private _updateRestTime(seconds: number): void {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    this.correctTimeFormat = `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  }
}
