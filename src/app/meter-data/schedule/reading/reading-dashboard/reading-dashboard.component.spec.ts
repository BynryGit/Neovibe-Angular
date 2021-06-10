import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingDashboardComponent } from './reading-dashboard.component';

describe('ReadingDashboardComponent', () => {
  let component: ReadingDashboardComponent;
  let fixture: ComponentFixture<ReadingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
