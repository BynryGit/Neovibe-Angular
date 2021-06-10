import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCompleteViewComponent } from './work-order-complete-view.component';

describe('WorkOrderCompleteViewComponent', () => {
  let component: WorkOrderCompleteViewComponent;
  let fixture: ComponentFixture<WorkOrderCompleteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderCompleteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCompleteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
