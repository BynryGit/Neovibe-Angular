import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsChannelComponent } from './payments-channel.component';

describe('PaymentsChannelComponent', () => {
  let component: PaymentsChannelComponent;
  let fixture: ComponentFixture<PaymentsChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
