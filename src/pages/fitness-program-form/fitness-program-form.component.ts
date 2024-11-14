import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FitnessButtonComponent } from '../../components';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';
import { TrainingProgramsService } from '../../services/training-programs/training-programs.service';

@Component({
  standalone: true,
  imports: [
    ...PRIMENG_COMPONENTS,
    ReactiveFormsModule,
    CommonModule,
    FitnessButtonComponent,
  ],
  providers: [MessageService],
  templateUrl: './fitness-program-form.component.html',
  styleUrl: './fitness-program-form.component.scss',
})
export class FitnessProgramFormComponent implements OnInit {
  programForm!: FormGroup;
  programCreated: ITrainingProgram = {};
  action: string = 'CREATE';
  errorMessage: string = '';

  constructor(
    private trainingPrograms: TrainingProgramsService,
    private router: Router,
    private toast: MessageService,
    private interceptor: HttpErrorsService
  ) {}

  ngOnInit(): void {
    this.programForm = new FormGroup(
      {
        programName: new FormControl<string>('', Validators.required),
        startDate: new FormControl<string>('', Validators.required),
        endDate: new FormControl<string>('', Validators.required),
      },
      { validators: this._checkDate('startDate', 'endDate') }
    );
  }

  get programNameControl() {
    return this.programForm.get('programName') as FormControl;
  }
  get startDateControl() {
    return this.programForm.get('startDate') as FormControl;
  }
  get endDateControl() {
    return this.programForm.get('endDate') as FormControl;
  }

  private _checkDate(start: string, end: string) {
    return (control: AbstractControl) => {
      const startDate = control.get(start)?.value;
      const endDate = control.get(end)?.value;
      return startDate < endDate ? null : { datesNotValid: true };
    };
  }

  public onCreateProgram(form: FormGroup) {
    const programName = (form && form.value && form.value.programName) || '';
    const startDate =
      form && form.value && form.value.startDate
        ? form.value.startDate
            .toLocaleDateString()
            .split('/')
            .reverse()
            .join('-')
        : '';
    const endDate =
      form && form.value && form.value.endDate
        ? form.value.endDate.toLocaleDateString().split('/').reverse().join('-')
        : '';
    const programToAdd: ITrainingProgram =
      programName && startDate && endDate
        ? { name: programName, date_start: startDate, date_end: endDate }
        : {};

    this.trainingPrograms.createTrainingProgram(programToAdd).subscribe({
      next: (program) => {
        this.programCreated = program;
        this.toast.add({
          severity: 'success',
          summary: 'Program Created',
          detail: 'Go grind now!',
          life: 1500,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleTrainingProgramError(err);
        this.toast.add({
          severity: 'error',
          detail: this.errorMessage,
          life: 1500,
        });
      },
    });
  }

  public navigateToPrograms() {
    this.router.navigate(['program-trainings'], { state: this.programCreated });
  }
}
