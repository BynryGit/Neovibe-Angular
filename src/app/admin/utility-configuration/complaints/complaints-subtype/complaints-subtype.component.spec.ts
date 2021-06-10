import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsSubtypeComponent } from './complaints-subtype.component';

describe('ComplaintsSubtypeComponent', () => {
  let component: ComplaintsSubtypeComponent;
  let fixture: ComponentFixture<ComplaintsSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
