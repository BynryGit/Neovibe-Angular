import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersProductCateoryComponent } from './suppliers-product-cateory.component';

describe('SuppliersProductCateoryComponent', () => {
  let component: SuppliersProductCateoryComponent;
  let fixture: ComponentFixture<SuppliersProductCateoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersProductCateoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersProductCateoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
