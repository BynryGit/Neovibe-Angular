import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityAddComponent } from './utility-add.component';

describe('UtilityAddComponent', () => {
  let component: UtilityAddComponent;
  let fixture: ComponentFixture<UtilityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
