import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SHARED_COMPONENTS } from '..';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { TrainingProgramsService } from '../../services/training-programs/training-programs.service';

@Component({
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule, PRIMENG_COMPONENTS],
  providers: [MessageService, ConfirmationService],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.scss',
})
export class FitnessProgramsComponent implements OnInit {
  programs: ITrainingProgram[] = [];
  speedItems: MenuItem[] = [];
  date: any;
  constructor(
    private trainingPrograms: TrainingProgramsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getTrainingPrograms();
  }

  private _getTrainingPrograms() {
    this.trainingPrograms.getTrainingPrograms().subscribe({
      next: (programs) => {
        programs = programs.map((program) => {
          const dateStart = new Date(program.date_start!)
            .toISOString()
            .split('T')[0]
            .replaceAll('-', '/');
          const dateEnd = new Date(program.date_end!)
            .toISOString()
            .split('T')[0]
            .replaceAll('-', '/');
          return { ...program, date_start: dateStart, date_end: dateEnd };
        });
        //! CATALOGARE X MESE
        this.programs = programs.sort((a, b) =>
          a.date_end! < b.date_end! ? 1 : -1
        );
      },
    });
  }

  private _deleteProgram(programID: number) {
    this.trainingPrograms.deleteTrainingProgram(programID).subscribe({
      next: (program) => {
        console.log(program);

        this._getTrainingPrograms();
      },
      error: () => {},
    });
  }

  alertDialogue(event: Event, programID: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you really want to delete this program?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      defaultFocus: 'none',
      accept: () => {
        this._deleteProgram(programID)
        this.messageService.add({
          severity: 'success',
          summary: 'Program Deleted',
          detail: 'Go ahead and make another one',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Stay Hard',
          detail: 'This program still could help',
        });
      },
    });
  }
}
