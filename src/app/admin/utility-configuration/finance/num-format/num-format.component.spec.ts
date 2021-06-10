import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumFormatComponent } from './num-format.component';

describe('NumFormatComponent', () => {
  let component: NumFormatComponent;
  let fixture: ComponentFixture<NumFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
