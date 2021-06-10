import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingFilterComponent } from './reading-filter.component';

describe('ReadingFilterComponent', () => {
  let component: ReadingFilterComponent;
  let fixture: ComponentFixture<ReadingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
