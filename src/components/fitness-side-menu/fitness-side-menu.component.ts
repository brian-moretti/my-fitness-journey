import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';
import { ViewportService } from '../../services/viewport/viewport.service';
import { FitnessButtonComponent } from '../fitness-button/fitness-button.component';

@Component({
  selector: 'app-fitness-side-menu',
  standalone: true,
  imports: [FitnessButtonComponent, CommonModule],
  templateUrl: './fitness-side-menu.component.html',
  styleUrl: './fitness-side-menu.component.scss',
  /* animations: [
    trigger('showSideMenuAnimation', [
      state('open', style({ opacity: 1, display: 'grid' })),
      state('closed', style({ opacity: 0, display: 'none' })),
      transition('open <=> closed', [animate('3s ease-in-out')]),
    ]),
  ], */
})
export class FitnessSideMenuComponent implements OnInit {
  viewScreen: number = window.innerWidth;
  showMenu!: boolean;

  buttons = [
    { title: 'PROGRAMS', urlLink: '/programs', outline: false },
    {
      title: 'EXERCISES DATABASE',
      urlLink: '/exercises',
      outline: false,
    },
    { title: 'SETTINGS', urlLink: '/settings', outline: false },
  ];

  constructor(
    private router: Router,
    private login: LoginService,
    private viewportService: ViewportService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.viewportService.viewScreen$.subscribe({
      next: (size) => {
        this.viewScreen = size;
      },
    });
  }

  //? TEST WINDOW WIDTH WITH ONCHANGES

  onActiveSection(index: number) {
    this.buttons.forEach((btn, i) => {
      btn.outline = i === index;
    });
  }

  showSideMenu() {
    this.showMenu = !this.showMenu;
  }

  //! MESSAGE ON LOGOUT + DELAY
  onLogout() {
    this.login
      .logoutUserUsingDelete()
      .subscribe({ next: () => {}, error: () => {} });
    this.auth.isLogoutStorage();
    this.router.navigate(['']);
  }
}
