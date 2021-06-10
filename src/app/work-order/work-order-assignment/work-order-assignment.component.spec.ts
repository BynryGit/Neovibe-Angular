import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderAssignmentComponent } from './work-order-assignment.component';

describe('WorkOrderAssignmentComponent', () => {
  let component: WorkOrderAssignmentComponent;
  let fixture: ComponentFixture<WorkOrderAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
