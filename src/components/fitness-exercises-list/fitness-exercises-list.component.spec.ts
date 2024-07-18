import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessExercisesListComponent } from './fitness-exercises-list.component';

describe('FitnessExercisesListComponent', () => {
  let component: FitnessExercisesListComponent;
  let fixture: ComponentFixture<FitnessExercisesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessExercisesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
