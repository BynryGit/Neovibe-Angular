import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDataTaskTemplateComponent } from './meter-data-task-template.component';

describe('MeterDataTaskTemplateComponent', () => {
  let component: MeterDataTaskTemplateComponent;
  let fixture: ComponentFixture<MeterDataTaskTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterDataTaskTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDataTaskTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
