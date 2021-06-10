import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersHolidaysComponent } from './work-orders-holidays.component';

describe('WorkOrdersHolidaysComponent', () => {
  let component: WorkOrdersHolidaysComponent;
  let fixture: ComponentFixture<WorkOrdersHolidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrdersHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrdersHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
