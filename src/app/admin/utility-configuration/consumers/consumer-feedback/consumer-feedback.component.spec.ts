import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFeedbackComponent } from './consumer-feedback.component';

describe('ConsumerFeedbackComponent', () => {
  let component: ConsumerFeedbackComponent;
  let fixture: ComponentFixture<ConsumerFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
