import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAdminOwnershipComponent } from './registration-admin-ownership.component';

describe('RegistrationAdminOwnershipComponent', () => {
  let component: RegistrationAdminOwnershipComponent;
  let fixture: ComponentFixture<RegistrationAdminOwnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAdminOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdminOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
