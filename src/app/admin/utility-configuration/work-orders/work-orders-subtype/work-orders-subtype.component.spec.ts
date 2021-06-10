import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersSubtypeComponent } from './work-orders-subtype.component';

describe('WorkOrdersSubtypeComponent', () => {
  let component: WorkOrdersSubtypeComponent;
  let fixture: ComponentFixture<WorkOrdersSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrdersSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrdersSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
