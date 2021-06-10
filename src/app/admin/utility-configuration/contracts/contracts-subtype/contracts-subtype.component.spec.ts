import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsSubtypeComponent } from './contracts-subtype.component';

describe('ContractsSubtypeComponent', () => {
  let component: ContractsSubtypeComponent;
  let fixture: ComponentFixture<ContractsSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
