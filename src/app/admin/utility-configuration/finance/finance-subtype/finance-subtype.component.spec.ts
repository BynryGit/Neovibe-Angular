import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceSubtypeComponent } from './finance-subtype.component';

describe('FinanceSubtypeComponent', () => {
  let component: FinanceSubtypeComponent;
  let fixture: ComponentFixture<FinanceSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
