import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth/auth.guard';
import { navigationDelayGuard } from '../guard/navigation-delay/navigation-delay.guard';
import { FitnessDashboardComponent } from '../pages/fitness-dashboard/fitness-dashboard.component';
import { FitnessExerciseFormComponent } from '../pages/fitness-exercise-form/fitness-exercise-form.component';
import { FitnessExercisesComponent } from '../pages/fitness-exercises/fitness-exercises.component';
import { FitnessHeroComponent } from '../pages/fitness-hero/fitness-hero.component';
import { FitnessLoginComponent } from '../pages/fitness-login/fitness-login.component';
import { FitnessProgramDetailsComponent } from '../pages/fitness-program-details/fitness-program-details.component';
import { FitnessProgramFormComponent } from '../pages/fitness-program-form/fitness-program-form.component';
import { FitnessProgramTrainingsComponent } from '../pages/fitness-program-trainings/fitness-program-trainings.component';
import { FitnessProgramsComponent } from '../pages/fitness-programs/fitness-programs.component';
import { FitnessSettingsComponent } from '../pages/fitness-settings/fitness-settings.component';
import { FitnessSignupComponent } from '../pages/fitness-signup/fitness-signup.component';

export const routes: Routes = [
  {
    path: '',
    component: FitnessHeroComponent,
    title: 'My Fitness Journey',
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
    canActivate: [AuthGuard],
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'program-form',
    component: FitnessProgramFormComponent,
    title: 'New Program',
    canActivate: [AuthGuard],
    canDeactivate: [navigationDelayGuard],
  },
  {
    path: 'program-trainings',
    component: FitnessProgramTrainingsComponent,
    title: 'Program Trainings',
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
