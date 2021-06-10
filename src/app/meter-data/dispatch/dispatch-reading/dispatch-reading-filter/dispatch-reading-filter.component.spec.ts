import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchReadingFilterComponent } from './dispatch-reading-filter.component';

describe('DispatchReadingFilterComponent', () => {
  let component: DispatchReadingFilterComponent;
  let fixture: ComponentFixture<DispatchReadingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchReadingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchReadingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
