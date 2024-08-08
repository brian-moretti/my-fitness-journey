import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessExercisesFormComponent } from './fitness-exercise-form.component';

describe('FitnessExercisesFormComponent', () => {
  let component: FitnessExercisesFormComponent;
  let fixture: ComponentFixture<FitnessExercisesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessExercisesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessExercisesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
