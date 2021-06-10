import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviceRequestsSubtypeComponent } from './sevice-requests-subtype.component';

describe('SeviceRequestsSubtypeComponent', () => {
  let component: SeviceRequestsSubtypeComponent;
  let fixture: ComponentFixture<SeviceRequestsSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviceRequestsSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviceRequestsSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
