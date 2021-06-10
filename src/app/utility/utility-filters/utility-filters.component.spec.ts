import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityFiltersComponent } from './utility-filters.component';

describe('UtilityFiltersComponent', () => {
  let component: UtilityFiltersComponent;
  let fixture: ComponentFixture<UtilityFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
