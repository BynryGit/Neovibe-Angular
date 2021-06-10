import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersTemplateComponent } from './suppliers-template.component';

describe('SuppliersTemplateComponent', () => {
  let component: SuppliersTemplateComponent;
  let fixture: ComponentFixture<SuppliersTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
