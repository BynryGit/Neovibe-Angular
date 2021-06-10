import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAdvTypeComponent } from './campaign-adv-type.component';

describe('CampaignAdvTypeComponent', () => {
  let component: CampaignAdvTypeComponent;
  let fixture: ComponentFixture<CampaignAdvTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAdvTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAdvTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
