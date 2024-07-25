import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessExerciseBoxItemComponent } from './fitness-exercise-box-item.component';

describe('FitnessExerciseBoxItemComponent', () => {
  let component: FitnessExerciseBoxItemComponent;
  let fixture: ComponentFixture<FitnessExerciseBoxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessExerciseBoxItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessExerciseBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
