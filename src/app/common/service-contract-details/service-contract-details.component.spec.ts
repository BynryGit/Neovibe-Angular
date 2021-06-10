import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceContractDetailsComponent } from './service-contract-details.component';

describe('ServiceContractDetailsComponent', () => {
  let component: ServiceContractDetailsComponent;
  let fixture: ComponentFixture<ServiceContractDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceContractDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
