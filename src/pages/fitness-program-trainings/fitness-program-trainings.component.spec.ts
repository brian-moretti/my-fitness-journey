import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramTrainingsComponent } from './fitness-program-trainings.component';

describe('FitnessProgramTrainingsComponent', () => {
  let component: FitnessProgramTrainingsComponent;
  let fixture: ComponentFixture<FitnessProgramTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessProgramTrainingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessProgramTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
