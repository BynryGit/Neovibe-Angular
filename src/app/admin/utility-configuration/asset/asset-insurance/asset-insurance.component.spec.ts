import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInsuranceComponent } from './asset-insurance.component';

describe('AssetInsuranceComponent', () => {
  let component: AssetInsuranceComponent;
  let fixture: ComponentFixture<AssetInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
