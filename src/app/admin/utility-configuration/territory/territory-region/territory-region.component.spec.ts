import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryRegionComponent } from './territory-region.component';

describe('TerritoryRegionComponent', () => {
  let component: TerritoryRegionComponent;
  let fixture: ComponentFixture<TerritoryRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
