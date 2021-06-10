import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDetailViewComponent } from './validation-detail-view.component';

describe('ValidationDetailViewComponent', () => {
  let component: ValidationDetailViewComponent;
  let fixture: ComponentFixture<ValidationDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
