import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SHARED_COMPONENTS } from '..';
import { FitnessPageStructureHtmlComponent } from '../../components/fitness-page-structure-html/fitness-page-structure-html.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IExercise } from '../../core/model';
import { IFilters } from '../../core/model/interface/filterExercises';
import { IPagination } from '../../core/model/interface/pagination';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';

@Component({
  selector: 'app-fitness-exercises',
  standalone: true,
  imports: [
    ...SHARED_COMPONENTS,
    CommonModule,
    PRIMENG_COMPONENTS,
    FitnessPageStructureHtmlComponent,
  ],
  providers: [MessageService],
  templateUrl: './fitness-exercises.component.html',
  styleUrl: './fitness-exercises.component.scss',
})
export class FitnessExercisesComponent implements OnInit {
  public exercises: IExercise[] = [];
  public pageDB: number = 1;
  public filters?: IFilters;
  public errorMessage: string = '';
  public pagination: IPagination = {
    first: 0,
    rows: 30,
    page: 0,
    totalRecords: 0,
  };
  public loading: boolean = true;

  constructor(
    private exerciseService: ExerciseService,
    private interceptor: HttpErrorsService,
    private toast: MessageService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this._getExercises();
    }, 1500);
  }

  private _getExercises() {
    this.exerciseService.getExercises(this.pageDB, this.filters).subscribe({
      next: (exercises) => {
        this.exercises = [...this.exercises, ...exercises];
        this.pagination.totalRecords = this.exercises.length;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleExerciseError(err);
        this.toast.add({
          severity: 'error',
          detail: this.errorMessage,
        });
        this.loading = false;
      },
    });
  }

  public onUpdateExerciseList(event: IPagination) {
    if (event.first! + event.rows! >= event.totalRecords! - 1) {
      this.pageDB += 1;
      this._getExercises();
    }
  }

  public onFilters(filters: IFilters) {
    this.pageDB = 1;
    this.pagination.first = 0;
    this.exercises = [];
    this.filters = filters;
    this._getExercises();
  }

  onDeleteExercise(exercise: IExercise) {
    this.exerciseService.deleteExerciseUsingDelete(exercise.id!).subscribe({
      next: () => {
        this.exercises = this.exercises.filter((ex) => ex.id !== exercise.id);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleExerciseError(err);
        this.toast.add({
          severity: 'error',
          detail: this.errorMessage,
        });
      },
    });
  }
}
