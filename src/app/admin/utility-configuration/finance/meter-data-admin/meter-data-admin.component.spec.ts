import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataAdminComponent } from './meter-data-admin.component';

describe('MeterDataAdminComponent', () => {
  let component: MeterDataAdminComponent;
  let fixture: ComponentFixture<MeterDataAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
