import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersTypeComponent } from './suppliers-type.component';

describe('SuppliersTypeComponent', () => {
  let component: SuppliersTypeComponent;
  let fixture: ComponentFixture<SuppliersTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
