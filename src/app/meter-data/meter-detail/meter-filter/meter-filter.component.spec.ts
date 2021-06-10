import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterFilterComponent } from './meter-filter.component';

describe('MeterFilterComponent', () => {
  let component: MeterFilterComponent;
  let fixture: ComponentFixture<MeterFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
