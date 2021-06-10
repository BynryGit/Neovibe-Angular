import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataAdminReaderStatusComponent } from './meter-data-admin-reader-status.component';

describe('MeterDataAdminReaderStatusComponent', () => {
  let component: MeterDataAdminReaderStatusComponent;
  let fixture: ComponentFixture<MeterDataAdminReaderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataAdminReaderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataAdminReaderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
