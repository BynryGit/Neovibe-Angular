import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTypeComponent } from './survey-type.component';

describe('SurveyTypeComponent', () => {
  let component: SurveyTypeComponent;
  let fixture: ComponentFixture<SurveyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
