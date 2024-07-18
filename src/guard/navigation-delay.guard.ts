import { CanDeactivateFn } from '@angular/router';
import { asyncScheduler, delay, scheduled } from 'rxjs';

export const navigationDelayGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  console.log(component);
  console.log(currentRoute);
  console.log(currentState);
  console.log(nextState);
  return scheduled([true], asyncScheduler).pipe(delay(500));
};
