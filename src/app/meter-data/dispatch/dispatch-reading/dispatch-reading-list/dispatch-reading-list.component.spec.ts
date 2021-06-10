import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchReadingListComponent } from './dispatch-reading-list.component';

describe('DispatchReadingListComponent', () => {
  let component: DispatchReadingListComponent;
  let fixture: ComponentFixture<DispatchReadingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchReadingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
