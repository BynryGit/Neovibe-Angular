import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityIntegrationComponent } from './utility-integration.component';

describe('UtilityIntegrationComponent', () => {
  let component: UtilityIntegrationComponent;
  let fixture: ComponentFixture<UtilityIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
