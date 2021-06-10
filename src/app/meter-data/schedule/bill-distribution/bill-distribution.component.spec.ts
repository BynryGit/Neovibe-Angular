import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDistributionComponent } from './bill-distribution.component';

describe('BillDistributionComponent', () => {
  let component: BillDistributionComponent;
  let fixture: ComponentFixture<BillDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
