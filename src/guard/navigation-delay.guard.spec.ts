import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { navigationDelayGuard } from './navigation-delay.guard';

describe('navigationDelayGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => navigationDelayGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
