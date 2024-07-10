import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';

@Component({
  selector: 'app-fitness-side-menu',
  standalone: true,
  imports: [FitnessButtonComponent, CommonModule],
  templateUrl: './fitness-side-menu.component.html',
  styleUrl: './fitness-side-menu.component.scss',
})
export class FitnessSideMenuComponent {
  constructor(private router: Router) {}

  active: boolean = false;

  buttons = [
    { title: 'PROGRAMS', urlLink: '/programs', outline: false },
    {
      title: 'EXERCISES DATABASE',
      urlLink: '/exercises-database',
      outline: false,
    },
    { title: 'SETTINGS', urlLink: '/settings', outline: false },
  ];

  onActiveSection(index: number) {
    this.buttons.forEach((btn, i) => {
      btn.outline = i === index;
    });
  }

  onLogout() {
    this.router.navigate(['/']);
  }
}
