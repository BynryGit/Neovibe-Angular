import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAdvertisementComponent } from './billing-advertisement.component';

describe('BillingAdvertisementComponent', () => {
  let component: BillingAdvertisementComponent;
  let fixture: ComponentFixture<BillingAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
