import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviceRequestsComponent } from './sevice-requests.component';

describe('SeviceRequestsComponent', () => {
  let component: SeviceRequestsComponent;
  let fixture: ComponentFixture<SeviceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
