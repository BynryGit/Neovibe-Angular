import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataAdminTypeComponent } from './meter-data-admin-type.component';

describe('MeterDataAdminTypeComponent', () => {
  let component: MeterDataAdminTypeComponent;
  let fixture: ComponentFixture<MeterDataAdminTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataAdminTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataAdminTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
