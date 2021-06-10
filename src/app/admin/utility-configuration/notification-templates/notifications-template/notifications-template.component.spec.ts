import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsTemplateComponent } from './notifications-template.component';

describe('NotificationsTemplateComponent', () => {
  let component: NotificationsTemplateComponent;
  let fixture: ComponentFixture<NotificationsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
