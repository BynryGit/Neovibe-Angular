import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersSupportComponent } from './consumers-support.component';

describe('ConsumersSupportComponent', () => {
  let component: ConsumersSupportComponent;
  let fixture: ComponentFixture<ConsumersSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
