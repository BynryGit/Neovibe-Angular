import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTypeComponent } from './services-type.component';

describe('ServicesTypeComponent', () => {
  let component: ServicesTypeComponent;
  let fixture: ComponentFixture<ServicesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
