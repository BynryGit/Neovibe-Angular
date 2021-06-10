import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentProcessingComponent } from './adjustment-processing.component';

describe('AdjustmentProcessingComponent', () => {
  let component: AdjustmentProcessingComponent;
  let fixture: ComponentFixture<AdjustmentProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmentProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
