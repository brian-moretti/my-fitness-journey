import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';
import { ITrainingProgram } from '../../core/model/interface/trainingProgram';
import { DateTrasformService } from '../../services/date-transform/date-trasform.service';

@Component({
  selector: 'app-fitness-program-box-item',
  standalone: true,
  imports: [PRIMENG_COMPONENTS, FitnessButtonComponent],
  templateUrl: './fitness-program-box-item.component.html',
  styleUrl: './fitness-program-box-item.component.scss',
})
export class FitnessProgramBoxItemComponent implements OnInit {
  @Input() program: ITrainingProgram = {};
  @Output() deleteProgram: EventEmitter<number> = new EventEmitter();
  public dateStart: string = '';
  public dateEnd: string = '';

  constructor(private dateTransform: DateTrasformService) {}

  ngOnInit(): void {
    this._mappingProgramDate();
  }

  private _mappingProgramDate() {
    this.dateStart = this.dateTransform.trasformDateToView(
      new Date(this.program.date_start!)
    );
    this.dateEnd = this.dateTransform.trasformDateToView(
      new Date(this.program.date_end!)
    );
  }

  onDeleteProgram(programID: number) {
    this.deleteProgram.emit(programID);
  }
}
