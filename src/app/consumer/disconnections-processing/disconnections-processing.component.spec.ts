import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectionsProcessingComponent } from './disconnections-processing.component';

describe('DisconnectionsProcessingComponent', () => {
  let component: DisconnectionsProcessingComponent;
  let fixture: ComponentFixture<DisconnectionsProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectionsProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectionsProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
