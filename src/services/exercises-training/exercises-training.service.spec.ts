import { TestBed } from '@angular/core/testing';

import { ExercisesTrainingService } from './exercises-training.service';

describe('ExercisesTrainingService', () => {
  let service: ExercisesTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
