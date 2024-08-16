import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessExerciseTrainingFormComponent } from './fitness-exercise-training-form.component';

describe('FitnessExerciseTrainingFormComponent', () => {
  let component: FitnessExerciseTrainingFormComponent;
  let fixture: ComponentFixture<FitnessExerciseTrainingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessExerciseTrainingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessExerciseTrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
