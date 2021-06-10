import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFilterComponent } from './validation-filter.component';

describe('ValidationFilterComponent', () => {
  let component: ValidationFilterComponent;
  let fixture: ComponentFixture<ValidationFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
