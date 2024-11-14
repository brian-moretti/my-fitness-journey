import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
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

  buttons: Array<{
    id: number;
    title: string;
    urlLink: string;
    class: 'PRIMARY' | 'SECONDARY' | 'ACCENT' | 'ONLYCOLOR' | 'EMPTY';
  }> = [
    {
      id: 1,
      title: 'PROGRAMS',
      urlLink: '/programs',
      class: 'PRIMARY',
    },
    {
      id: 2,
      title: 'EXERCISES DATABASE',
      urlLink: '/exercises',
      class: 'PRIMARY',
    },
    {
      id: 3,
      title: 'SETTINGS',
      urlLink: '/settings',
      class: 'PRIMARY',
    },
  ];
  activeBtn: number | null = null;

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

  onActiveSection(buttonId: number) {
    this.activeBtn = buttonId;
    this.buttons.forEach((btn) => {
      btn.class = 'SECONDARY'
      //btn.class = this.activeBtn === btn.id ? 'SECONDARY' : 'PRIMARY';
    });
  }

  showSideMenu() {
    this.showMenu = !this.showMenu;
  }

  //! MESSAGE ON LOGOUT + DELAY
  onLogout() {
    this.login.logoutUserUsingDelete().subscribe({
      next: () => {
        this.auth.isLogoutStorage();
        this.router.navigate(['']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  }
}
