import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SHARED_COMPONENTS } from '..';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';

@Component({
  selector: 'app-fitness-programs',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule, PRIMENG_COMPONENTS],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.scss',
})
export class FitnessProgramsComponent {
  programs: ITrainin = [];
}
