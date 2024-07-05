import { Component } from '@angular/core';
import { SHARED_COMPONENTS } from '..';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fitness-hero',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule],
  templateUrl: './fitness-hero.component.html',
  styleUrl: './fitness-hero.component.scss',
})
export class FitnessHeroComponent {}
