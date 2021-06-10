import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAdminSubtypeComponent } from './registration-admin-subtype.component';

describe('RegistrationAdminSubtypeComponent', () => {
  let component: RegistrationAdminSubtypeComponent;
  let fixture: ComponentFixture<RegistrationAdminSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAdminSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdminSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
