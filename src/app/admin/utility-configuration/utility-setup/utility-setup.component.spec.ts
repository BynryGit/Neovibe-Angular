import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitySetupComponent } from './utility-setup.component';

describe('UtilitySetupComponent', () => {
  let component: UtilitySetupComponent;
  let fixture: ComponentFixture<UtilitySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
