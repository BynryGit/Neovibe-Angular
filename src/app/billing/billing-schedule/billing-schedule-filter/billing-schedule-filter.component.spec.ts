import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingScheduleFilterComponent } from './billing-schedule-filter.component';

describe('BillingScheduleFilterComponent', () => {
  let component: BillingScheduleFilterComponent;
  let fixture: ComponentFixture<BillingScheduleFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingScheduleFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingScheduleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
