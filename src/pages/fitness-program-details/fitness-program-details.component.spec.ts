import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramDetailsComponent } from './fitness-program-details.component';

describe('FitnessProgramDetailsComponent', () => {
  let component: FitnessProgramDetailsComponent;
  let fixture: ComponentFixture<FitnessProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessProgramDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
