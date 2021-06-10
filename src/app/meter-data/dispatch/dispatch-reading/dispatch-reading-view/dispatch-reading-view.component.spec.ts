import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchReadingViewComponent } from './dispatch-reading-view.component';

describe('DispatchReadingViewComponent', () => {
  let component: DispatchReadingViewComponent;
  let fixture: ComponentFixture<DispatchReadingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchReadingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchReadingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
