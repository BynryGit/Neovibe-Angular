import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingScheduleListComponent } from './billing-schedule-list.component';

describe('BillingScheduleListComponent', () => {
  let component: BillingScheduleListComponent;
  let fixture: ComponentFixture<BillingScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
