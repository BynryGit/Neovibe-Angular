import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOfferDetailsComponent } from './consumer-offer-details.component';

describe('ConsumerOfferDetailsComponent', () => {
  let component: ConsumerOfferDetailsComponent;
  let fixture: ComponentFixture<ConsumerOfferDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerOfferDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
