import { Component } from '@angular/core';
import { SHARED_COMPONENTS } from '..';

@Component({
  standalone: true,
  imports: [...SHARED_COMPONENTS],
  templateUrl: './fitness-login.component.html',
  styleUrl: './fitness-login.component.scss',
})
export class FitnessLoginComponent {}
