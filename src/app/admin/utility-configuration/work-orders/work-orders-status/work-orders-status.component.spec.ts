import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersStatusComponent } from './work-orders-status.component';

describe('WorkOrdersStatusComponent', () => {
  let component: WorkOrdersStatusComponent;
  let fixture: ComponentFixture<WorkOrdersStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrdersStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrdersStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
