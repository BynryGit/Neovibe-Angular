import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcmTypeComponent } from './hcm-type.component';

describe('HcmTypeComponent', () => {
  let component: HcmTypeComponent;
  let fixture: ComponentFixture<HcmTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcmTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcmTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
