import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerDetailViewComponent } from './consumer-detail-view.component';

describe('ConsumerDetailViewComponent', () => {
  let component: ConsumerDetailViewComponent;
  let fixture: ComponentFixture<ConsumerDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
