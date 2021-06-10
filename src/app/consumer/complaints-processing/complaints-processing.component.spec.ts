import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsProcessingComponent } from './complaints-processing.component';

describe('ComplaintsProcessingComponent', () => {
  let component: ComplaintsProcessingComponent;
  let fixture: ComponentFixture<ComplaintsProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
