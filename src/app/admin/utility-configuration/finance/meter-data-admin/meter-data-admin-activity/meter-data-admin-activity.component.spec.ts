import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataAdminActivityComponent } from './meter-data-admin-activity.component';

describe('MeterDataAdminActivityComponent', () => {
  let component: MeterDataAdminActivityComponent;
  let fixture: ComponentFixture<MeterDataAdminActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataAdminActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataAdminActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
