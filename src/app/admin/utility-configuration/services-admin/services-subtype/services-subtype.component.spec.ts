import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSubtypeComponent } from './services-subtype.component';

describe('ServicesSubtypeComponent', () => {
  let component: ServicesSubtypeComponent;
  let fixture: ComponentFixture<ServicesSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
