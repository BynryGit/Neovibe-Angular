import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorOrdersTypeComponent } from './wor-orders-type.component';

describe('WorOrdersTypeComponent', () => {
  let component: WorOrdersTypeComponent;
  let fixture: ComponentFixture<WorOrdersTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorOrdersTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorOrdersTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
