import { Component } from '@angular/core';
import { SHARED_COMPONENTS } from '..';

@Component({
  selector: 'app-fitness-settings',
  standalone: true,
  imports: [...SHARED_COMPONENTS],
  templateUrl: './fitness-settings.component.html',
  styleUrl: './fitness-settings.component.scss',
})
export class FitnessSettingsComponent {}
