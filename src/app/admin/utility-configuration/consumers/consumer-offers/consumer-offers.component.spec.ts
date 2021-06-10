import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOffersComponent } from './consumer-offers.component';

describe('ConsumerOffersComponent', () => {
  let component: ConsumerOffersComponent;
  let fixture: ComponentFixture<ConsumerOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
