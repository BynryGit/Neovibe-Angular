import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryDivisionComponent } from './territory-division.component';

describe('TerritoryDivisionComponent', () => {
  let component: TerritoryDivisionComponent;
  let fixture: ComponentFixture<TerritoryDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
