import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumFormatTabComponent } from './num-format-tab.component';

describe('NumFormatTabComponent', () => {
  let component: NumFormatTabComponent;
  let fixture: ComponentFixture<NumFormatTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumFormatTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumFormatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
