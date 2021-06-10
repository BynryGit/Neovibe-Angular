import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataAdminReadingAssignmentsComponent } from './meter-data-admin-reading-assignments.component';

describe('MeterDataAdminReadingAssignmentsComponent', () => {
  let component: MeterDataAdminReadingAssignmentsComponent;
  let fixture: ComponentFixture<MeterDataAdminReadingAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataAdminReadingAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataAdminReadingAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
