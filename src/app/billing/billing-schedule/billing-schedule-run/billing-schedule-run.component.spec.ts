import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingScheduleRunComponent } from './billing-schedule-run.component';

describe('BillingScheduleRunComponent', () => {
  let component: BillingScheduleRunComponent;
  let fixture: ComponentFixture<BillingScheduleRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingScheduleRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingScheduleRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
