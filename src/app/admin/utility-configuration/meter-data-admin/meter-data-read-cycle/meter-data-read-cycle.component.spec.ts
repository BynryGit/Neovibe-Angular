import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataReadCycleComponent } from './meter-data-read-cycle.component';

describe('MeterDataReadCycleComponent', () => {
  let component: MeterDataReadCycleComponent;
  let fixture: ComponentFixture<MeterDataReadCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataReadCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataReadCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
