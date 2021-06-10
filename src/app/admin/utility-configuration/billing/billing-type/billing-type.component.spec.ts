import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTypeComponent } from './billing-type.component';

describe('BillingTypeComponent', () => {
  let component: BillingTypeComponent;
  let fixture: ComponentFixture<BillingTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
