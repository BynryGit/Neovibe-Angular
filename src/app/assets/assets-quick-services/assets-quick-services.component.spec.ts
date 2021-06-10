import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsQuickServicesComponent } from './assets-quick-services.component';

describe('AssetsQuickServicesComponent', () => {
  let component: AssetsQuickServicesComponent;
  let fixture: ComponentFixture<AssetsQuickServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsQuickServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsQuickServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
