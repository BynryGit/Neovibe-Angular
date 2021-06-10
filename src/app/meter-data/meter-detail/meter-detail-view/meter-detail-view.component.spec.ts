import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDetailViewComponent } from './meter-detail-view.component';

describe('MeterDetailViewComponent', () => {
  let component: MeterDetailViewComponent;
  let fixture: ComponentFixture<MeterDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
