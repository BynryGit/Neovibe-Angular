import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersTermsComponent } from './tenders-terms.component';

describe('TendersTermsComponent', () => {
  let component: TendersTermsComponent;
  let fixture: ComponentFixture<TendersTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TendersTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TendersTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
