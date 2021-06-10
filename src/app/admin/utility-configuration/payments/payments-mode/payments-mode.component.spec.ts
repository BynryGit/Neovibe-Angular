import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsModeComponent } from './payments-mode.component';

describe('PaymentsModeComponent', () => {
  let component: PaymentsModeComponent;
  let fixture: ComponentFixture<PaymentsModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
