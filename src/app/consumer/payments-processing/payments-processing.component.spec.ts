import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsProcessingComponent } from './payments-processing.component';

describe('PaymentsProcessingComponent', () => {
  let component: PaymentsProcessingComponent;
  let fixture: ComponentFixture<PaymentsProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
