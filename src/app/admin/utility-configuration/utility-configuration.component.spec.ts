import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityConfigurationComponent } from './utility-configuration.component';

describe('UtilityConfigurationComponent', () => {
  let component: UtilityConfigurationComponent;
  let fixture: ComponentFixture<UtilityConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
