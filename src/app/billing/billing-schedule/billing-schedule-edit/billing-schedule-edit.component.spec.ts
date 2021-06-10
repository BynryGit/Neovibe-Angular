import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingScheduleEditComponent } from './billing-schedule-edit.component';

describe('BillingScheduleEditComponent', () => {
  let component: BillingScheduleEditComponent;
  let fixture: ComponentFixture<BillingScheduleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingScheduleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingScheduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
