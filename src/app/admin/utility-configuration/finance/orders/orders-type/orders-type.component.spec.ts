import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTypeComponent } from './orders-type.component';

describe('OrdersTypeComponent', () => {
  let component: OrdersTypeComponent;
  let fixture: ComponentFixture<OrdersTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
