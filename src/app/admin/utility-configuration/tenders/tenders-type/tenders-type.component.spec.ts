import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersTypeComponent } from './tenders-type.component';

describe('TendersTypeComponent', () => {
  let component: TendersTypeComponent;
  let fixture: ComponentFixture<TendersTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TendersTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TendersTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
