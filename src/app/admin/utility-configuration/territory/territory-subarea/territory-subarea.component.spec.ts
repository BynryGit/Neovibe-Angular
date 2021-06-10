import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritorySubareaComponent } from './territory-subarea.component';

describe('TerritorySubareaComponent', () => {
  let component: TerritorySubareaComponent;
  let fixture: ComponentFixture<TerritorySubareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritorySubareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritorySubareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
