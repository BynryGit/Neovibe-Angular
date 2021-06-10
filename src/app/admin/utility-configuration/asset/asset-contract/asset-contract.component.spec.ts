import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetContractComponent } from './asset-contract.component';

describe('AssetContractComponent', () => {
  let component: AssetContractComponent;
  let fixture: ComponentFixture<AssetContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
