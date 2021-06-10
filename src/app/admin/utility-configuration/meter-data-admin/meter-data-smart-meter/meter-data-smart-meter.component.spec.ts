import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataSmartMeterComponent } from './meter-data-smart-meter.component';

describe('MeterDataSmartMeterComponent', () => {
  let component: MeterDataSmartMeterComponent;
  let fixture: ComponentFixture<MeterDataSmartMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataSmartMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataSmartMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
