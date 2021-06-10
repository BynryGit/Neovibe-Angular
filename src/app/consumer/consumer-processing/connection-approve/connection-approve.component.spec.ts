import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionApproveComponent } from './connection-approve.component';

describe('ConnectionApproveComponent', () => {
  let component: ConnectionApproveComponent;
  let fixture: ComponentFixture<ConnectionApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
