import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth/auth.guard';
import { navigationDelayGuard } from '../guard/navigation-delay.guard';
import { FitnessDashboardComponent } from '../pages/fitness-dashboard/fitness-dashboard.component';
import { FitnessExerciseFormComponent } from '../pages/fitness-exercise-form/fitness-exercise-form.component';
import { FitnessExercisesComponent } from '../pages/fitness-exercises/fitness-exercises.component';
import { FitnessHeroComponent } from '../pages/fitness-hero/fitness-hero.component';
import { FitnessLoginComponent } from '../pages/fitness-login/fitness-login.component';
import { FitnessProgramDetailsComponent } from '../pages/fitness-program-details/fitness-program-details.component';
import { FitnessProgramsComponent } from '../pages/fitness-programs/fitness-programs.component';
import { FitnessSettingsComponent } from '../pages/fitness-settings/fitness-settings.component';
import { FitnessSignupComponent } from '../pages/fitness-signup/fitness-signup.component';

export const routes: Routes = [
  {
    path: '',
    component: FitnessHeroComponent,
    title: 'Your Fitness Journey',
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'auth/login',
    component: FitnessLoginComponent,
    title: 'Login Page',
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'auth/signup',
    component: FitnessSignupComponent,
    title: 'Signup Page',
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'dashboard',
    component: FitnessDashboardComponent,
    title: 'Your Dashboard',
    canActivate: [AuthGuard],
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'programs',
    component: FitnessProgramsComponent,
    title: 'Your Programs',
    canActivate: [AuthGuard],
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'program/:id',
    component: FitnessProgramDetailsComponent,
    title: 'Program :name',
    canActivate: [AuthGuard],
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'exercises',
    component: FitnessExercisesComponent,
    title: 'Exercises List',
    canActivate: [AuthGuard],
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'exercise-form',
    component: FitnessExerciseFormComponent,
    title: 'Exercise Form',
    canActivate: [AuthGuard],
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'settings',
    component: FitnessSettingsComponent,
    title: 'Settings',
    canActivate: [AuthGuard],
    canDeactivate: [navigationDelayGuard],
  },
];
