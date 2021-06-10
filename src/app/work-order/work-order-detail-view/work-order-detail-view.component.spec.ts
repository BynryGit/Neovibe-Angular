import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderDetailViewComponent } from './work-order-detail-view.component';

describe('WorkOrderDetailViewComponent', () => {
  let component: WorkOrderDetailViewComponent;
  let fixture: ComponentFixture<WorkOrderDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
