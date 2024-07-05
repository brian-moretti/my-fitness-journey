import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessFooterComponent } from './fitness-footer.component';

describe('FitnessFooterComponent', () => {
  let component: FitnessFooterComponent;
  let fixture: ComponentFixture<FitnessFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
