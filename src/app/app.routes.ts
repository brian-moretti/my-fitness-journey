import { Routes } from '@angular/router';
import { FitnessDashboardComponent } from '../pages/fitness-dashboard/fitness-dashboard.component';
import { FitnessHeroComponent } from '../pages/fitness-hero/fitness-hero.component';
import { FitnessLoginComponent } from '../pages/fitness-login/fitness-login.component';
import { FitnessProgramDetailsComponent } from '../pages/fitness-program-details/fitness-program-details.component';

export const routes: Routes = [
  { path: '', component: FitnessHeroComponent, title: 'Your Fitness Journey' },
  { path: 'auth/login', component: FitnessLoginComponent, title: 'Login Page' },
  {
    path: 'dashboard',
    component: FitnessDashboardComponent,
    title: 'Your Dashboard',
  },
  {
    path: 'program/:id',
    component: FitnessProgramDetailsComponent,
    title: `Program `,
  },
];
