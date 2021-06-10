import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFiltersComponent } from './registration-filters.component';

describe('RegistrationFiltersComponent', () => {
  let component: RegistrationFiltersComponent;
  let fixture: ComponentFixture<RegistrationFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
