import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFiltersComponent } from './consumer-filters.component';

describe('ConsumerFiltersComponent', () => {
  let component: ConsumerFiltersComponent;
  let fixture: ComponentFixture<ConsumerFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
