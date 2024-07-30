import { Routes } from '@angular/router';
import { navigationDelayGuard } from '../guard/navigation-delay.guard';
import { FitnessDashboardComponent } from '../pages/fitness-dashboard/fitness-dashboard.component';
import { FitnessExercisesFormComponent } from '../pages/fitness-exercises-form/fitness-exercises-form.component';
import { FitnessExercisesComponent } from '../pages/fitness-exercises/fitness-exercises.component';
import { FitnessHeroComponent } from '../pages/fitness-hero/fitness-hero.component';
import { FitnessLoginComponent } from '../pages/fitness-login/fitness-login.component';
import { FitnessProgramDetailsComponent } from '../pages/fitness-program-details/fitness-program-details.component';
import { FitnessProgramsComponent } from '../pages/fitness-programs/fitness-programs.component';
import { FitnessSettingsComponent } from '../pages/fitness-settings/fitness-settings.component';
import { FitnessSignupComponent } from '../pages/fitness-signup/fitness-signup.component';

export const routes: Routes = [
  { path: '', component: FitnessHeroComponent, title: 'Your Fitness Journey' },
  { path: 'auth/login', component: FitnessLoginComponent, title: 'Login Page' },
  {
    path: 'auth/signup',
    component: FitnessSignupComponent,
    title: 'Signup Page',
  },
  {
    path: 'dashboard',
    component: FitnessDashboardComponent,
    title: 'Your Dashboard',
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'programs',
    component: FitnessProgramsComponent,
    title: 'Your Programs',
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'program/:id',
    component: FitnessProgramDetailsComponent,
    title: `Program `,
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'exercises',
    component: FitnessExercisesComponent,
    title: 'Exercises List',
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'exercises-form',
    component: FitnessExercisesFormComponent,
    title: 'Exercises Form',
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'settings',
    component: FitnessSettingsComponent,
    title: 'Settings',
    canDeactivate: [navigationDelayGuard],
  },
];
