import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsTypeComponent } from './contracts-type.component';

describe('ContractsTypeComponent', () => {
  let component: ContractsTypeComponent;
  let fixture: ComponentFixture<ContractsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
