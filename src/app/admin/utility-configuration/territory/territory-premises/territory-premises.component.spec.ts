import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryPremisesComponent } from './territory-premises.component';

describe('TerritoryPremisesComponent', () => {
  let component: TerritoryPremisesComponent;
  let fixture: ComponentFixture<TerritoryPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
