import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersProductSubcateoryComponent } from './suppliers-product-subcateory.component';

describe('SuppliersProductSubcateoryComponent', () => {
  let component: SuppliersProductSubcateoryComponent;
  let fixture: ComponentFixture<SuppliersProductSubcateoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersProductSubcateoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersProductSubcateoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
