import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramBoxItemComponent } from './fitness-program-box-item.component';

describe('FitnessProgramBoxItemComponent', () => {
  let component: FitnessProgramBoxItemComponent;
  let fixture: ComponentFixture<FitnessProgramBoxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessProgramBoxItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessProgramBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
