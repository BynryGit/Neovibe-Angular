import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityIntegrationTabComponent } from './utility-integration-tab.component';

describe('UtilityIntegrationTabComponent', () => {
  let component: UtilityIntegrationTabComponent;
  let fixture: ComponentFixture<UtilityIntegrationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityIntegrationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityIntegrationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
