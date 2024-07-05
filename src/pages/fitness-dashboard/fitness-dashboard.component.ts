import { Component } from '@angular/core';
import { SHARED_COMPONENTS } from '..';

@Component({
  selector: 'app-fitness-dashboard',
  standalone: true,
  imports: [...SHARED_COMPONENTS],
  templateUrl: './fitness-dashboard.component.html',
  styleUrl: './fitness-dashboard.component.scss',
})
export class FitnessDashboardComponent {}
