import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataAdminValidationAssignmentsComponent } from './meter-data-admin-validation-assignments.component';

describe('MeterDataAdminValidationAssignmentsComponent', () => {
  let component: MeterDataAdminValidationAssignmentsComponent;
  let fixture: ComponentFixture<MeterDataAdminValidationAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataAdminValidationAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataAdminValidationAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
