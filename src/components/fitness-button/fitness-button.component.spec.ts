import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessButtonComponent } from './fitness-button.component';

describe('FitnessButtonComponent', () => {
  let component: FitnessButtonComponent;
  let fixture: ComponentFixture<FitnessButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
