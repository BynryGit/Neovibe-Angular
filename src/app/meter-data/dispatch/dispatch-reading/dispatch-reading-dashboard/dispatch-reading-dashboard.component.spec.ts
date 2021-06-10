import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchReadingDashboardComponent } from './dispatch-reading-dashboard.component';

describe('DispatchReadingDashboardComponent', () => {
  let component: DispatchReadingDashboardComponent;
  let fixture: ComponentFixture<DispatchReadingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchReadingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchReadingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
