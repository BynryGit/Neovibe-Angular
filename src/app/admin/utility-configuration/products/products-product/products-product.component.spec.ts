import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductComponent } from './products-product.component';

describe('ProductsProductComponent', () => {
  let component: ProductsProductComponent;
  let fixture: ComponentFixture<ProductsProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
