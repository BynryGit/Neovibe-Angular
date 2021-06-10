import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityModulesComponent } from './utility-modules.component';

describe('UtilityModulesComponent', () => {
  let component: UtilityModulesComponent;
  let fixture: ComponentFixture<UtilityModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
