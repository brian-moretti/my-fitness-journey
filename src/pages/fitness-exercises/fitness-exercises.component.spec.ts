import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessExercisesComponent } from './fitness-exercises.component';

describe('FitnessExercisesComponent', () => {
  let component: FitnessExercisesComponent;
  let fixture: ComponentFixture<FitnessExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessExercisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
