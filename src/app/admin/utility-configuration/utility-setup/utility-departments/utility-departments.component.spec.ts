import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityDepartmentsComponent } from './utility-departments.component';

describe('UtilityDepartmentsComponent', () => {
  let component: UtilityDepartmentsComponent;
  let fixture: ComponentFixture<UtilityDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
