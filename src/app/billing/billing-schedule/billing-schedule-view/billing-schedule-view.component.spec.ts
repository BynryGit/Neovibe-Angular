import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingScheduleViewComponent } from './billing-schedule-view.component';

describe('BillingScheduleViewComponent', () => {
  let component: BillingScheduleViewComponent;
  let fixture: ComponentFixture<BillingScheduleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingScheduleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
