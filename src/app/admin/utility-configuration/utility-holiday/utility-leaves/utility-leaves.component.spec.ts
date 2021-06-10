import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityLeavesComponent } from './utility-leaves.component';

describe('UtilityLeavesComponent', () => {
  let component: UtilityLeavesComponent;
  let fixture: ComponentFixture<UtilityLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
