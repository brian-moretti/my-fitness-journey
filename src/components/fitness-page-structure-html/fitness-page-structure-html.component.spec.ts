import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessPageStructureHtmlComponent } from './fitness-page-structure-html.component';

describe('FitnessPageStructureHtmlComponent', () => {
  let component: FitnessPageStructureHtmlComponent;
  let fixture: ComponentFixture<FitnessPageStructureHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessPageStructureHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessPageStructureHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
