import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsTypeComponent } from './complaints-type.component';

describe('ComplaintsTypeComponent', () => {
  let component: ComplaintsTypeComponent;
  let fixture: ComponentFixture<ComplaintsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
