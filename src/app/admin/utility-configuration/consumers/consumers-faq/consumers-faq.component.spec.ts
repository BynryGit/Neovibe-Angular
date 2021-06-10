import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersFaqComponent } from './consumers-faq.component';

describe('ConsumersFaqComponent', () => {
  let component: ConsumersFaqComponent;
  let fixture: ComponentFixture<ConsumersFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
