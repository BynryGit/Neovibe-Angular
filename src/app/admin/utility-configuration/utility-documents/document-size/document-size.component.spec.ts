import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSizeComponent } from './document-size.component';

describe('DocumentSizeComponent', () => {
  let component: DocumentSizeComponent;
  let fixture: ComponentFixture<DocumentSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
