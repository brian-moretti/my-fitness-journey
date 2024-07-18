import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessSettingsComponent } from './fitness-settings.component';

describe('FitnessSettingsComponent', () => {
  let component: FitnessSettingsComponent;
  let fixture: ComponentFixture<FitnessSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
