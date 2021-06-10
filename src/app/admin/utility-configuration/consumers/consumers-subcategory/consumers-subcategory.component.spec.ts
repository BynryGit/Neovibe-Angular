import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersSubcategoryComponent } from './consumers-subcategory.component';

describe('ConsumersSubcategoryComponent', () => {
  let component: ConsumersSubcategoryComponent;
  let fixture: ComponentFixture<ConsumersSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
