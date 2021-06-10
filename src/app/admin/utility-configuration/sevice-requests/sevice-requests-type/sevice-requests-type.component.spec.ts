import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviceRequestsTypeComponent } from './sevice-requests-type.component';

describe('SeviceRequestsTypeComponent', () => {
  let component: SeviceRequestsTypeComponent;
  let fixture: ComponentFixture<SeviceRequestsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviceRequestsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviceRequestsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
