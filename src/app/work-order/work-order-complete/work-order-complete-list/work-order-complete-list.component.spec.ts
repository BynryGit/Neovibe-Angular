import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCompleteListComponent } from './work-order-complete-list.component';

describe('WorkOrderCompleteListComponent', () => {
  let component: WorkOrderCompleteListComponent;
  let fixture: ComponentFixture<WorkOrderCompleteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderCompleteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCompleteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
