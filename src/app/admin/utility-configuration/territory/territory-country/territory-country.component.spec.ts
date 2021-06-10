import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryCountryComponent } from './territory-country.component';

describe('TerritoryCountryComponent', () => {
  let component: TerritoryCountryComponent;
  let fixture: ComponentFixture<TerritoryCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
