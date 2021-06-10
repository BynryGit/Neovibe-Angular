import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyObjectiveComponent } from './survey-objective.component';

describe('SurveyObjectiveComponent', () => {
  let component: SurveyObjectiveComponent;
  let fixture: ComponentFixture<SurveyObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
