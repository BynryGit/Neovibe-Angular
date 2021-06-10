import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryAreaComponent } from './territory-area.component';

describe('TerritoryAreaComponent', () => {
  let component: TerritoryAreaComponent;
  let fixture: ComponentFixture<TerritoryAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
