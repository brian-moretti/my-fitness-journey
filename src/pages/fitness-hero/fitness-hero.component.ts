import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SHARED_COMPONENTS } from '..';
import { ViewportService } from '../../services/viewport/viewport.service';

@Component({
  selector: 'app-fitness-hero',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule, NgOptimizedImage],
  templateUrl: './fitness-hero.component.html',
  styleUrl: './fitness-hero.component.scss',
})
export class FitnessHeroComponent implements OnInit {
  viewScreen: number = window.innerWidth;

  constructor(private viewportService: ViewportService) {}

  ngOnInit(): void {
    this.viewportService.viewScreen$.subscribe({
      next: (size) => (this.viewScreen = size),
    });
  }
}
