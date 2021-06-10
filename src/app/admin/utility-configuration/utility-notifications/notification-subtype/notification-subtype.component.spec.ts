import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSubtypeComponent } from './notification-subtype.component';

describe('NotificationSubtypeComponent', () => {
  let component: NotificationSubtypeComponent;
  let fixture: ComponentFixture<NotificationSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
