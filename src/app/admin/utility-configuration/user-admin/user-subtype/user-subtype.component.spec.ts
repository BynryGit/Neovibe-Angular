import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubtypeComponent } from './user-subtype.component';

describe('UserSubtypeComponent', () => {
  let component: UserSubtypeComponent;
  let fixture: ComponentFixture<UserSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
