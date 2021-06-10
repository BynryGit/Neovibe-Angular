import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySubtypeComponent } from './survey-subtype.component';

describe('SurveySubtypeComponent', () => {
  let component: SurveySubtypeComponent;
  let fixture: ComponentFixture<SurveySubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
