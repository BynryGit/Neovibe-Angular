import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransferComponent } from './update-transfer.component';

describe('UpdateTransferComponent', () => {
  let component: UpdateTransferComponent;
  let fixture: ComponentFixture<UpdateTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
