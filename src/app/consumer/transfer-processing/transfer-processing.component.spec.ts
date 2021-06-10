import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferProcessingComponent } from './transfer-processing.component';

describe('TransferProcessingComponent', () => {
  let component: TransferProcessingComponent;
  let fixture: ComponentFixture<TransferProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
