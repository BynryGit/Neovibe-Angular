import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritorySectionComponent } from './territory-section.component';

describe('TerritorySectionComponent', () => {
  let component: TerritorySectionComponent;
  let fixture: ComponentFixture<TerritorySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritorySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
