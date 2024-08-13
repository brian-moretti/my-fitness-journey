import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramFormComponent } from './fitness-program-form.component';

describe('FitnessProgramFormComponent', () => {
  let component: FitnessProgramFormComponent;
  let fixture: ComponentFixture<FitnessProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessProgramFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
