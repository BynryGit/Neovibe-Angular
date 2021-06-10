import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityProductsComponent } from './utility-products.component';

describe('UtilityProductsComponent', () => {
  let component: UtilityProductsComponent;
  let fixture: ComponentFixture<UtilityProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
