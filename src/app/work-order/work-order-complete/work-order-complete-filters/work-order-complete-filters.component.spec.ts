import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCompleteFiltersComponent } from './work-order-complete-filters.component';

describe('WorkOrderCompleteFiltersComponent', () => {
  let component: WorkOrderCompleteFiltersComponent;
  let fixture: ComponentFixture<WorkOrderCompleteFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderCompleteFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCompleteFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
