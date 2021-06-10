import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAdminTypeComponent } from './registration-admin-type.component';

describe('RegistrationAdminTypeComponent', () => {
  let component: RegistrationAdminTypeComponent;
  let fixture: ComponentFixture<RegistrationAdminTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAdminTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdminTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
