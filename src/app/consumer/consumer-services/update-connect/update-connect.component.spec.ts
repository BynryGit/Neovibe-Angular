import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConnectComponent } from './update-connect.component';

describe('UpdateConnectComponent', () => {
  let component: UpdateConnectComponent;
  let fixture: ComponentFixture<UpdateConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
