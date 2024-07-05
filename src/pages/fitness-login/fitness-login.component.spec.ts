import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessLoginComponent } from './fitness-login.component';

describe('FitnessLoginComponent', () => {
  let component: FitnessLoginComponent;
  let fixture: ComponentFixture<FitnessLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
