import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { cloneDeep } from 'lodash';
import { FitnessExerciseTrainingFieldComponent } from '../../components/fitness-exercise-training-field/fitness-exercise-training-field.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { TrainingProgramsService } from '../../services/training-programs/training-programs.service';
import { FitnessButtonComponent } from '../../components/fitness-button/fitness-button.component';
import { ViewportService } from '../../services/viewport/viewport.service';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { DateTrasformService } from '../../services/date-transform/date-trasform.service';

@Component({
  selector: 'app-fitness-program-details',
  standalone: true,
  imports: [
    PRIMENG_COMPONENTS,
    CommonModule,
    FitnessExerciseTrainingFieldComponent,
    FitnessButtonComponent,
  ],
  templateUrl: './fitness-program-details.component.html',
  styleUrl: './fitness-program-details.component.scss',
})
export class FitnessProgramDetailsComponent implements OnInit {
  program: ITrainingProgram = {};
  backupProgram: ITrainingProgram = {};
  routeID: number = Number(this.route.snapshot.paramMap.get('id'));
  isEditable: boolean = false;
  viewScreen: number = window.innerWidth;

  constructor(
    private route: ActivatedRoute,
    private trainingPrograms: TrainingProgramsService,
    private viewportService: ViewportService,
    private titleService: Title,
    private dateTransform: DateTrasformService
  ) {}

  ngOnInit(): void {
    this._getTrainingProgram();
    this.viewportService.viewScreen$.subscribe({
      next: (size) => (this.viewScreen = size),
    });
  }

  private _getTrainingProgram() {
    this.trainingPrograms.getSingleTrainingProgram(this.routeID).subscribe({
      next: (program) => {
        program.date_start = new Date(program.date_start!);
        program.date_end = new Date(program.date_end!);
        this.program = program;
        this.backupProgram = cloneDeep(this.program);
        this.titleService.setTitle(`Program: ${this.program.name}`);
      },
      error: () => {},
    });
  }

  updateTrainingProgram() {
    this.trainingPrograms.updateTrainingProgram(this.program).subscribe({
      next: (updatedProgram) => {
        this._getTrainingProgram();
        this.backupProgram = this.program;
      },
      error: () => {},
    });
  }

  editTrainingProgram() {
    this.isEditable = true;
  }

  saveTrainingProgram() {
    this.program = {
      ...this.program,
      date_start: this.dateTransform.trasformDateToDB(
        new Date(this.program.date_start!)
      ),
      date_end: this.dateTransform.trasformDateToDB(
        new Date(this.program.date_end!)
      ),
    };
    this.updateTrainingProgram();
    this.isEditable = false;
  }
}
