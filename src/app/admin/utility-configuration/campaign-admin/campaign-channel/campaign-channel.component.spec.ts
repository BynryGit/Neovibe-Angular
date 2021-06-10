import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignChannelComponent } from './campaign-channel.component';

describe('CampaignChannelComponent', () => {
  let component: CampaignChannelComponent;
  let fixture: ComponentFixture<CampaignChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
