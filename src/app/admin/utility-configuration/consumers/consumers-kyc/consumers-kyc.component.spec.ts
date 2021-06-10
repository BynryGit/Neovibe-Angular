import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersKycComponent } from './consumers-kyc.component';

describe('ConsumersKycComponent', () => {
  let component: ConsumersKycComponent;
  let fixture: ComponentFixture<ConsumersKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
