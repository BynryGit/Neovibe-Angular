import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferApproveComponent } from './transfer-approve.component';

describe('TransferApproveComponent', () => {
  let component: TransferApproveComponent;
  let fixture: ComponentFixture<TransferApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
