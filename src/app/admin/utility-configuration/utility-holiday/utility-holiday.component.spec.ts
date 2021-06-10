import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityHolidayComponent } from './utility-holiday.component';

describe('UtilityHolidayComponent', () => {
  let component: UtilityHolidayComponent;
  let fixture: ComponentFixture<UtilityHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
