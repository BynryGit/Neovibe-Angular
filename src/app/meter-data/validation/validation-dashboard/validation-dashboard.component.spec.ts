import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDashboardComponent } from './validation-dashboard.component';

describe('ValidationDashboardComponent', () => {
  let component: ValidationDashboardComponent;
  let fixture: ComponentFixture<ValidationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
