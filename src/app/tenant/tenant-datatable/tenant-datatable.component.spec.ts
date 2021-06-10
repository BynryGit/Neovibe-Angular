import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDatatableComponent } from './tenant-datatable.component';

describe('TenantDatatableComponent', () => {
  let component: TenantDatatableComponent;
  let fixture: ComponentFixture<TenantDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
