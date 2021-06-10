import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingScheduleAddComponent } from './billing-schedule-add.component';

describe('BillingScheduleAddComponent', () => {
  let component: BillingScheduleAddComponent;
  let fixture: ComponentFixture<BillingScheduleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingScheduleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingScheduleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
