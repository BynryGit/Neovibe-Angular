import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersSubtypeComponent } from './tenders-subtype.component';

describe('TendersSubtypeComponent', () => {
  let component: TendersSubtypeComponent;
  let fixture: ComponentFixture<TendersSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TendersSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TendersSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
