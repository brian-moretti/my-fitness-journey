import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SHARED_COMPONENTS } from '..';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { TrainingProgramsService } from '../../services/training-programs/training-programs.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-fitness-programs',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule, PRIMENG_COMPONENTS],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.scss',
})
export class FitnessProgramsComponent implements OnInit {
  programs: ITrainingProgram[] = [];
  speedItems: MenuItem[] = [] 
  date: any;
  constructor(private trainingPrograms: TrainingProgramsService) {}

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

  test(event: Date) {
    console.log(event.getFullYear());
  }
}
