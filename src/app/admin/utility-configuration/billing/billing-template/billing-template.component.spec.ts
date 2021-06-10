import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTemplateComponent } from './billing-template.component';

describe('BillingTemplateComponent', () => {
  let component: BillingTemplateComponent;
  let fixture: ComponentFixture<BillingTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
