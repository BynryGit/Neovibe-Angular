import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcmComponent } from './hcm.component';

describe('HcmComponent', () => {
  let component: HcmComponent;
  let fixture: ComponentFixture<HcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
