import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferProcessingComponent } from './offer-processing.component';

describe('OfferProcessingComponent', () => {
  let component: OfferProcessingComponent;
  let fixture: ComponentFixture<OfferProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
