import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsumerValidationComponent } from './new-consumer-validation.component';

describe('NewConsumerValidationComponent', () => {
  let component: NewConsumerValidationComponent;
  let fixture: ComponentFixture<NewConsumerValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConsumerValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConsumerValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
