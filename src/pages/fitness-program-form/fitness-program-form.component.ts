import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
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
  action: string = 'CREATE';

  constructor(
    private trainingPrograms: TrainingProgramsService,
    private router: Router,
    private toast: MessageService
  ) {}

  ngOnInit(): void {
    this.programForm = new FormGroup({
      programName: new FormControl<string>('', Validators.required),
      startDate: new FormControl<string>('', Validators.required),
      endDate: new FormControl<string>('', Validators.required),
    });
  }

  onCreateProgram(form: FormGroup) {
    const programName = (form && form.value && form.value.programName) || '';
    const startDate =
      form && form.value && form.value.startDate
        ? form.value.startDate.toISOString().split('T')[0]
        : '';
    const endDate =
      form && form.value && form.value.endDate
        ? form.value.endDate.toISOString().split('T')[0]
        : '';
    const programToAdd: ITrainingProgram =
      programName && startDate && endDate
        ? { name: programName, date_start: startDate, date_end: endDate }
        : {};

    this.trainingPrograms.createTrainingProgram(programToAdd).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Program Created',
          detail: 'Go grind now!',
          life: 1500,
        });
      },
      error: () => {},
    });
  }

  navigateToPrograms() {
    this.router.navigate(['programs']);
  }
}
