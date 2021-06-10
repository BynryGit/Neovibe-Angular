import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchReadingRevisitComponent } from './dispatch-reading-revisit.component';

describe('DispatchReadingRevisitComponent', () => {
  let component: DispatchReadingRevisitComponent;
  let fixture: ComponentFixture<DispatchReadingRevisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchReadingRevisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchReadingRevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
