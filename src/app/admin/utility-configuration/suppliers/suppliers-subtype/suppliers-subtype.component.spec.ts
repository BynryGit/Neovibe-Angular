import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersSubtypeComponent } from './suppliers-subtype.component';

describe('SuppliersSubtypeComponent', () => {
  let component: SuppliersSubtypeComponent;
  let fixture: ComponentFixture<SuppliersSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
