import { CommonModule } from '@angular/common';
import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { SHARED_COMPONENTS } from '..';

@Component({
  selector: 'app-fitness-hero',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule],
  templateUrl: './fitness-hero.component.html',
  styleUrl: './fitness-hero.component.scss',
})
export class FitnessHeroComponent implements OnInit {
  viewScreen: any = '';

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.updateViewport();
  }

  @HostListener('window:resize', ['$event'])
  onResizeScreen(event: Event) {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.updateViewport();
      });
    }, 100);
  }

  updateViewport() {
    this.viewScreen = window.innerWidth;
  }
}
