import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataAdminBillCycleComponent } from './meter-data-admin-bill-cycle.component';

describe('MeterDataAdminBillCycleComponent', () => {
  let component: MeterDataAdminBillCycleComponent;
  let fixture: ComponentFixture<MeterDataAdminBillCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataAdminBillCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataAdminBillCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
