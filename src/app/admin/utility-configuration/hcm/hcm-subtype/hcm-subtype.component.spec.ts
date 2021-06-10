import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcmSubtypeComponent } from './hcm-subtype.component';

describe('HcmSubtypeComponent', () => {
  let component: HcmSubtypeComponent;
  let fixture: ComponentFixture<HcmSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcmSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcmSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
