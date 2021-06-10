import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSubtypeComponent } from './orders-subtype.component';

describe('OrdersSubtypeComponent', () => {
  let component: OrdersSubtypeComponent;
  let fixture: ComponentFixture<OrdersSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
