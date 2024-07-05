import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessHeroComponent } from './fitness-hero.component';

describe('FitnessHeroComponent', () => {
  let component: FitnessHeroComponent;
  let fixture: ComponentFixture<FitnessHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
