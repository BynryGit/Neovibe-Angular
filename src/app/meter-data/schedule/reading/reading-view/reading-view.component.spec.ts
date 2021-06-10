import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingViewComponent } from './reading-view.component';

describe('ReadingViewComponent', () => {
  let component: ReadingViewComponent;
  let fixture: ComponentFixture<ReadingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
