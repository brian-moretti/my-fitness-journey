import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessExerciseTrainingFieldComponent } from './fitness-exercise-training-field.component';

describe('FitnessExerciseTrainingFieldComponent', () => {
  let component: FitnessExerciseTrainingFieldComponent;
  let fixture: ComponentFixture<FitnessExerciseTrainingFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessExerciseTrainingFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessExerciseTrainingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
