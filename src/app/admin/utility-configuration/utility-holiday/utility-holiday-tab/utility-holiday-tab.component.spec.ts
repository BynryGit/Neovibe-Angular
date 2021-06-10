import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityHolidayTabComponent } from './utility-holiday-tab.component';

describe('UtilityHolidayTabComponent', () => {
  let component: UtilityHolidayTabComponent;
  let fixture: ComponentFixture<UtilityHolidayTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityHolidayTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityHolidayTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
