import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryCityComponent } from './territory-city.component';

describe('TerritoryCityComponent', () => {
  let component: TerritoryCityComponent;
  let fixture: ComponentFixture<TerritoryCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
