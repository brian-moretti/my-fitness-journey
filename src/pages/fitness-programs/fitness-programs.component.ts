import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SHARED_COMPONENTS } from '..';
import { FitnessPageStructureHtmlComponent } from '../../components/fitness-page-structure-html/fitness-page-structure-html.component';
import { FitnessProgramBoxItemComponent } from '../../components/fitness-program-box-item/fitness-program-box-item.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';
import { TrainingProgramsService } from '../../services/training-programs/training-programs.service';

@Component({
  standalone: true,
  imports: [
    ...SHARED_COMPONENTS,
    CommonModule,
    PRIMENG_COMPONENTS,
    FitnessProgramBoxItemComponent,
    FitnessPageStructureHtmlComponent,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.scss',
})
export class FitnessProgramsComponent implements OnInit {
  public programs: ITrainingProgram[] = [];
  public errorMessage: string = '';
  public isLoading: boolean = true;

  constructor(
    private trainingPrograms: TrainingProgramsService,
    private toast: MessageService,
    private confirmationService: ConfirmationService,
    private interceptor: HttpErrorsService
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
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleTrainingProgramError(err);
        this.toast.add({
          severity: 'error',
          detail: this.errorMessage,
        });
      },
    });
  }

  private _deleteProgram(programID: number) {
    this.trainingPrograms.deleteTrainingProgram(programID).subscribe({
      next: (program) => {
        this._getTrainingPrograms();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleTrainingProgramError(err);
        this.toast.add({
          severity: 'error',
          detail: this.errorMessage,
        });
      },
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
        this.toast.add({
          severity: 'success',
          summary: 'Program Deleted',
          detail: 'Go ahead and make another one',
          life: 2000,
        });
      },
      reject: () => {
        this.toast.add({
          severity: 'info',
          summary: 'Stay Hard',
          detail: 'This program could still help you',
          life: 2000,
        });
      },
    });
  }
}
