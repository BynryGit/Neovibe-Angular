import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerTipsComponent } from './consumer-tips.component';

describe('ConsumerTipsComponent', () => {
  let component: ConsumerTipsComponent;
  let fixture: ComponentFixture<ConsumerTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
