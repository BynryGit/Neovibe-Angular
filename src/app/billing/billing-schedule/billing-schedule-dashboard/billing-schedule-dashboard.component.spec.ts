import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingScheduleDashboardComponent } from './billing-schedule-dashboard.component';

describe('BillingScheduleDashboardComponent', () => {
  let component: BillingScheduleDashboardComponent;
  let fixture: ComponentFixture<BillingScheduleDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingScheduleDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingScheduleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
