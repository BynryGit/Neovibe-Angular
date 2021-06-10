import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogTabComponent } from './activity-log-tab.component';

describe('ActivityLogTabComponent', () => {
  let component: ActivityLogTabComponent;
  let fixture: ComponentFixture<ActivityLogTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLogTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
