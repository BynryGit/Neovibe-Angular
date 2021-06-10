import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSubtypeComponent } from './document-subtype.component';

describe('DocumentSubtypeComponent', () => {
  let component: DocumentSubtypeComponent;
  let fixture: ComponentFixture<DocumentSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
