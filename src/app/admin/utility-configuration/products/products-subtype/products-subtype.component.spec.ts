import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSubtypeComponent } from './products-subtype.component';

describe('ProductsSubtypeComponent', () => {
  let component: ProductsSubtypeComponent;
  let fixture: ComponentFixture<ProductsSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
