import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSubcategoryComponent } from './asset-subcategory.component';

describe('AssetSubcategoryComponent', () => {
  let component: AssetSubcategoryComponent;
  let fixture: ComponentFixture<AssetSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
