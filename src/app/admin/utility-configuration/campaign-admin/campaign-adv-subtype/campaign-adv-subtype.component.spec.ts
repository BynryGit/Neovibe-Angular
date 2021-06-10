import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAdvSubtypeComponent } from './campaign-adv-subtype.component';

describe('CampaignAdvSubtypeComponent', () => {
  let component: CampaignAdvSubtypeComponent;
  let fixture: ComponentFixture<CampaignAdvSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAdvSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAdvSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
