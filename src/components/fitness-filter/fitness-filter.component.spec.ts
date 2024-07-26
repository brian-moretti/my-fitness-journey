import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessFilterComponent } from './fitness-filter.component';

describe('FitnessFilterComponent', () => {
  let component: FitnessFilterComponent;
  let fixture: ComponentFixture<FitnessFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
