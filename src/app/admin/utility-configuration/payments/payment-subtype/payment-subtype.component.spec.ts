import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSubtypeComponent } from './payment-subtype.component';

describe('PaymentSubtypeComponent', () => {
  let component: PaymentSubtypeComponent;
  let fixture: ComponentFixture<PaymentSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
