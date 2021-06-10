import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsFiltersComponent } from './assets-filters.component';

describe('AssetsFiltersComponent', () => {
  let component: AssetsFiltersComponent;
  let fixture: ComponentFixture<AssetsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
