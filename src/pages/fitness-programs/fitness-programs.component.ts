import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SHARED_COMPONENTS } from '..';
import { FitnessProgramBoxItemComponent } from '../../components/fitness-program-box-item/fitness-program-box-item.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { TrainingProgramsService } from '../../services/training-programs/training-programs.service';

@Component({
  standalone: true,
  imports: [
    ...SHARED_COMPONENTS,
    CommonModule,
    PRIMENG_COMPONENTS,
    FitnessProgramBoxItemComponent,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.scss',
})
export class FitnessProgramsComponent implements OnInit {
  public programs: ITrainingProgram[] = [];

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
        this._getTrainingPrograms();
      },
      error: () => {},
    });
  }

  public alertDialogue(programID: number) {
    this.confirmationService.confirm({
      message: 'Do you really want to delete this program?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      defaultFocus: 'none',
      accept: () => {
        this._deleteProgram(programID);
        this.messageService.add({
          severity: 'success',
          summary: 'Program Deleted',
          detail: 'Go ahead and make another one',
          life: 2000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Stay Hard',
          detail: 'This program could still help you',
          life: 2000,
        });
      },
    });
  }
}
