import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSubtypeComponent } from './campaign-subtype.component';

describe('CampaignSubtypeComponent', () => {
  let component: CampaignSubtypeComponent;
  let fixture: ComponentFixture<CampaignSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
