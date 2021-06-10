import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintFiltersComponent } from './complaint-filters.component';

describe('ComplaintFiltersComponent', () => {
  let component: ComplaintFiltersComponent;
  let fixture: ComponentFixture<ComplaintFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
