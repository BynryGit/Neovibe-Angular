import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTypeComponent } from './offer-type.component';

describe('OfferTypeComponent', () => {
  let component: OfferTypeComponent;
  let fixture: ComponentFixture<OfferTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
