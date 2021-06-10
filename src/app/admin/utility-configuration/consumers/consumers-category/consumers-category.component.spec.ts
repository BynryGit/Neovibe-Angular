import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersCategoryComponent } from './consumers-category.component';

describe('ConsumersCategoryComponent', () => {
  let component: ConsumersCategoryComponent;
  let fixture: ComponentFixture<ConsumersCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
