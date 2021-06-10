import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersQuotationComponent } from './tenders-quotation.component';

describe('TendersQuotationComponent', () => {
  let component: TendersQuotationComponent;
  let fixture: ComponentFixture<TendersQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TendersQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TendersQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
