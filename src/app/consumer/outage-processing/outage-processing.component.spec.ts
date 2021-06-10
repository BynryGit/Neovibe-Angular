import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageProcessingComponent } from './outage-processing.component';

describe('OutageProcessingComponent', () => {
  let component: OutageProcessingComponent;
  let fixture: ComponentFixture<OutageProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutageProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutageProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
