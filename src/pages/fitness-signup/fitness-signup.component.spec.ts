import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessSignupComponent } from './fitness-signup.component';

describe('FitnessSignupComponent', () => {
  let component: FitnessSignupComponent;
  let fixture: ComponentFixture<FitnessSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
