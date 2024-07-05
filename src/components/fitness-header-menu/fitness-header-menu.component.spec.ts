import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessHeaderMenuComponent } from './fitness-header-menu.component';

describe('FitnessHeaderMenuComponent', () => {
  let component: FitnessHeaderMenuComponent;
  let fixture: ComponentFixture<FitnessHeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessHeaderMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
