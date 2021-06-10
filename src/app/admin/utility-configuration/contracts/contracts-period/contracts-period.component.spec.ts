import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsPeriodComponent } from './contracts-period.component';

describe('ContractsPeriodComponent', () => {
  let component: ContractsPeriodComponent;
  let fixture: ComponentFixture<ContractsPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
