import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { FitnessExerciseTrainingFieldComponent } from '../../components/fitness-exercise-training-field/fitness-exercise-training-field.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { TrainingProgramsService } from '../../services/training-programs/training-programs.service';

@Component({
  selector: 'app-fitness-program-details',
  standalone: true,
  imports: [
    PRIMENG_COMPONENTS,
    CommonModule,
    FitnessExerciseTrainingFieldComponent,
  ],
  templateUrl: './fitness-program-details.component.html',
  styleUrl: './fitness-program-details.component.scss',
})
export class FitnessProgramDetailsComponent implements OnInit {
  program: ITrainingProgram = {};
  backupProgram: ITrainingProgram = {};
  routeID: number = Number(this.route.snapshot.paramMap.get('id'));
  isEditable: boolean = false;
  readOnly: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private trainingPrograms: TrainingProgramsService
  ) {}

  ngOnInit(): void {
    this._getTrainingProgram();
  }

  private _getTrainingProgram() {
    this.trainingPrograms.getSingleTrainingProgram(this.routeID).subscribe({
      next: (program) => {
        program = program.map((p) => {
          const dateStart = new Date(p.date_start!);
          const dateEnd = new Date(p.date_end!);
          const formattedDateStart = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(dateStart);
          const formattedDateEnd = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(dateEnd);
          return {
            ...p,
            date_start: formattedDateStart,
            date_end: formattedDateEnd,
          };
        });
        
        this.program = program[0];
        console.log(this.program);
        this.backupProgram = cloneDeep(this.program);
      },
      error: () => {},
    });
  }

  updateTrainingProgram() {
    this.trainingPrograms.updateTrainingProgram(this.program).subscribe({
      next: (updatedProgram) => {
        console.log(updatedProgram);
        this.backupProgram = this.program;
      },
      error: () => {},
    });
  }

  private _getSingleExercise() {}

  editTrainingProgram() {
    this.isEditable = true;
  }
}
