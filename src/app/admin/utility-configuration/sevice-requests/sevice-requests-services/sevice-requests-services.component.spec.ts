import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviceRequestsServicesComponent } from './sevice-requests-services.component';

describe('SeviceRequestsServicesComponent', () => {
  let component: SeviceRequestsServicesComponent;
  let fixture: ComponentFixture<SeviceRequestsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviceRequestsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviceRequestsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
