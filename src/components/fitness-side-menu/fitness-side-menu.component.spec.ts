import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessSideMenuComponent } from './fitness-side-menu.component';

describe('FitnessSideMenuComponent', () => {
  let component: FitnessSideMenuComponent;
  let fixture: ComponentFixture<FitnessSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessSideMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
