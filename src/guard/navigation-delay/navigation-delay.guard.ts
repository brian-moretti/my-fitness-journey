import { CanDeactivateFn } from '@angular/router';
import { asyncScheduler, delay, scheduled } from 'rxjs';

export const navigationDelayGuard: CanDeactivateFn<boolean> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return scheduled([true], asyncScheduler).pipe(delay(500));
};
