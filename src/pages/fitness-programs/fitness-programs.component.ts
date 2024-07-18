import { Component } from '@angular/core';
import { SHARED_COMPONENTS } from '..';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fitness-programs',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.scss',
})
export class FitnessProgramsComponent {
  programs = []
}
