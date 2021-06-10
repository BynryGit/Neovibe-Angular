import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityDocumentsComponent } from './utility-documents.component';

describe('UtilityDocumentsComponent', () => {
  let component: UtilityDocumentsComponent;
  let fixture: ComponentFixture<UtilityDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
