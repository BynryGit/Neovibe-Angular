import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingAddComponent } from './reading-add.component';

describe('ReadingAddComponent', () => {
  let component: ReadingAddComponent;
  let fixture: ComponentFixture<ReadingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
