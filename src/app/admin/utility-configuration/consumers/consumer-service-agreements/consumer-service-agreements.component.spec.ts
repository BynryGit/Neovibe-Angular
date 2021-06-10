import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerServiceAgreementsComponent } from './consumer-service-agreements.component';

describe('ConsumerServiceAgreementsComponent', () => {
  let component: ConsumerServiceAgreementsComponent;
  let fixture: ComponentFixture<ConsumerServiceAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerServiceAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerServiceAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
