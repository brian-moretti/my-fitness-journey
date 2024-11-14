import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessAuthStructureHtmlComponent } from './fitness-auth-structure-html.component';

describe('FitnessAuthStructureHtmlComponent', () => {
  let component: FitnessAuthStructureHtmlComponent;
  let fixture: ComponentFixture<FitnessAuthStructureHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessAuthStructureHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessAuthStructureHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
