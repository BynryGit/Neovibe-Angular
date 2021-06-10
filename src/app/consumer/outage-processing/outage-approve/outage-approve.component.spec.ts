import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageApproveComponent } from './outage-approve.component';

describe('OutageApproveComponent', () => {
  let component: OutageApproveComponent;
  let fixture: ComponentFixture<OutageApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutageApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutageApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
