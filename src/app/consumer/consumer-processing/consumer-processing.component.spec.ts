import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerProcessingComponent } from './consumer-processing.component';

describe('ConsumerProcessingComponent', () => {
  let component: ConsumerProcessingComponent;
  let fixture: ComponentFixture<ConsumerProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
