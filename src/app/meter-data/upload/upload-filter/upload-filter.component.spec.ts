import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilterComponent } from './upload-filter.component';

describe('UploadFilterComponent', () => {
  let component: UploadFilterComponent;
  let fixture: ComponentFixture<UploadFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
