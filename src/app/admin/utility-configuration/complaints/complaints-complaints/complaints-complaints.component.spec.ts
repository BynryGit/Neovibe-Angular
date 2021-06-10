import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsComplaintsComponent } from './complaints-complaints.component';

describe('ComplaintsComplaintsComponent', () => {
  let component: ComplaintsComplaintsComponent;
  let fixture: ComponentFixture<ComplaintsComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
