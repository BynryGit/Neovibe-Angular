import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataAdminRouteComponent } from './meter-data-admin-route.component';

describe('MeterDataAdminRouteComponent', () => {
  let component: MeterDataAdminRouteComponent;
  let fixture: ComponentFixture<MeterDataAdminRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataAdminRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataAdminRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
