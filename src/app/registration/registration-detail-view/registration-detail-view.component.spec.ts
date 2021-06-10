import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDetailViewComponent } from './registration-detail-view.component';

describe('RegistrationDetailViewComponent', () => {
  let component: RegistrationDetailViewComponent;
  let fixture: ComponentFixture<RegistrationDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
