import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAdminConsumerconsentComponent } from './registration-admin-consumerconsent.component';

describe('RegistrationAdminConsumerconsentComponent', () => {
  let component: RegistrationAdminConsumerconsentComponent;
  let fixture: ComponentFixture<RegistrationAdminConsumerconsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAdminConsumerconsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdminConsumerconsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
