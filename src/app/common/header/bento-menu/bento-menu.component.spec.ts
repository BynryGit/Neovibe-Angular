import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BentoMenuComponent } from './bento-menu.component';

describe('BentoMenuComponent', () => {
  let component: BentoMenuComponent;
  let fixture: ComponentFixture<BentoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BentoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BentoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
