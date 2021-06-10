import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityListComponent } from './utility-list.component';

describe('UtilityListComponent', () => {
  let component: UtilityListComponent;
  let fixture: ComponentFixture<UtilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
