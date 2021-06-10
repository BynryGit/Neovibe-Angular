import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsApproveComponent } from './complaints-approve.component';

describe('ComplaintsApproveComponent', () => {
  let component: ComplaintsApproveComponent;
  let fixture: ComponentFixture<ComplaintsApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
