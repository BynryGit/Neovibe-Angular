import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOutageComponent } from './update-outage.component';

describe('UpdateOutageComponent', () => {
  let component: UpdateOutageComponent;
  let fixture: ComponentFixture<UpdateOutageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOutageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOutageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
