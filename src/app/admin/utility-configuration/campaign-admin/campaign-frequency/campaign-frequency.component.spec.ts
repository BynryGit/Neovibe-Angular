import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFrequencyComponent } from './campaign-frequency.component';

describe('CampaignFrequencyComponent', () => {
  let component: CampaignFrequencyComponent;
  let fixture: ComponentFixture<CampaignFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
