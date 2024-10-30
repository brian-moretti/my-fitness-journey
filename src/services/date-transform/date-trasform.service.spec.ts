import { TestBed } from '@angular/core/testing';

import { DateTrasformService } from './date-trasform.service';

describe('DateTrasformService', () => {
  let service: DateTrasformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTrasformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
