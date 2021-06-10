import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingScheduleComponent } from './billing-schedule.component';

describe('BillingScheduleComponent', () => {
  let component: BillingScheduleComponent;
  let fixture: ComponentFixture<BillingScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
