import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectionsApproveComponent } from './disconnections-approve.component';

describe('DisconnectionsApproveComponent', () => {
  let component: DisconnectionsApproveComponent;
  let fixture: ComponentFixture<DisconnectionsApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectionsApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectionsApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
