import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAdminTemplatesComponent } from './registration-admin-templates.component';

describe('RegistrationAdminTemplatesComponent', () => {
  let component: RegistrationAdminTemplatesComponent;
  let fixture: ComponentFixture<RegistrationAdminTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAdminTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdminTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
