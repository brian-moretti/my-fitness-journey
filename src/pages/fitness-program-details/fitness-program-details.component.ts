import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { TrainingProgramsService } from '../../services/training-programs/training-programs.service';
import { FitnessExerciseTrainingFieldComponent } from "../../components/fitness-exercise-training-field/fitness-exercise-training-field.component";

@Component({
  selector: 'app-fitness-program-details',
  standalone: true,
  imports: [PRIMENG_COMPONENTS, CommonModule, FitnessExerciseTrainingFieldComponent],
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
          const startDate = p.date_start?.split('T')[0].replaceAll('-', '/');
          const endDate = p.date_end?.split('T')[0].replaceAll('-', '/');
          return { ...p, date_start: startDate, date_end: endDate };
        });
        this.program = program[0];
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

  private _getSingleExercise(){
    
  }

  editTrainingProgram() {
    this.isEditable = true;
  }
}
