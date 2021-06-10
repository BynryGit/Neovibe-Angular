import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerApproveComponent } from './consumer-approve.component';

describe('ConsumerApproveComponent', () => {
  let component: ConsumerApproveComponent;
  let fixture: ComponentFixture<ConsumerApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
