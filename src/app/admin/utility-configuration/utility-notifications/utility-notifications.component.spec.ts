import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityNotificationsComponent } from './utility-notifications.component';

describe('UtilityNotificationsComponent', () => {
  let component: UtilityNotificationsComponent;
  let fixture: ComponentFixture<UtilityNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
