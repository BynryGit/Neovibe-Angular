import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchReadingComponent } from './dispatch-reading.component';

describe('DispatchReadingComponent', () => {
  let component: DispatchReadingComponent;
  let fixture: ComponentFixture<DispatchReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
