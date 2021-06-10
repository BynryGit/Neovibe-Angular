import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCompleteSummaryComponent } from './work-order-complete-summary.component';

describe('WorkOrderCompleteSummaryComponent', () => {
  let component: WorkOrderCompleteSummaryComponent;
  let fixture: ComponentFixture<WorkOrderCompleteSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderCompleteSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCompleteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
