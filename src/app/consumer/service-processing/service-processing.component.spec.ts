import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProcessingComponent } from './service-processing.component';

describe('ServiceProcessingComponent', () => {
  let component: ServiceProcessingComponent;
  let fixture: ComponentFixture<ServiceProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
