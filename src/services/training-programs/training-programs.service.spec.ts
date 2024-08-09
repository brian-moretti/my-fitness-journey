import { TestBed } from '@angular/core/testing';

import { TrainingProgramsService } from './training-programs.service';

describe('TrainingProgramsService', () => {
  let service: TrainingProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
