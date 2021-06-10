import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryStateComponent } from './territory-state.component';

describe('TerritoryStateComponent', () => {
  let component: TerritoryStateComponent;
  let fixture: ComponentFixture<TerritoryStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
