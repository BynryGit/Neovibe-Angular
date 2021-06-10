import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerContactusComponent } from './consumer-contactus.component';

describe('ConsumerContactusComponent', () => {
  let component: ConsumerContactusComponent;
  let fixture: ComponentFixture<ConsumerContactusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerContactusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
