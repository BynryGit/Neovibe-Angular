import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSubtypeComponent } from './offer-subtype.component';

describe('OfferSubtypeComponent', () => {
  let component: OfferSubtypeComponent;
  let fixture: ComponentFixture<OfferSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
