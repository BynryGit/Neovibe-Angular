import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAdminDocumentsComponent } from './registration-admin-documents.component';

describe('RegistrationAdminDocumentsComponent', () => {
  let component: RegistrationAdminDocumentsComponent;
  let fixture: ComponentFixture<RegistrationAdminDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAdminDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdminDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
