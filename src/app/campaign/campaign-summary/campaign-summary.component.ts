import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../common/dashboard/dashboard.service';

@Component({
  selector: 'app-campaign-summary',
  templateUrl: './campaign-summary.component.html',
  styleUrls: ['./campaign-summary.component.scss']
})
export class CampaignSummaryComponent implements OnInit {

  constructor(private dashboardService:DashboardService) {
  }

  ngOnInit(): void {
    this.sendDashboardData()
  }

  sendDashboardData(){
    this.dashboardService.DashboardEvent.emit(this.blocks);
  }

  
  imageUrls = {
    new_image : '../../assets/images/dashboard-card-add-img.png',
    expire_image : '../../assets/images/dashboard-card-img2.png',
    discontineud_image : '../../assets/images/dashboard-card-img3.png',
    contract_image : '../../assets/images/dashboard-card-img3.png'
  }

  blocks = [
    {
      name : 'New',
      img : this.imageUrls.new_image,
      count : '50',
      class : 'badge badge-pill badge-label-pending',
      default : 'Campaign'
    },
    {
      name : 'Expire',
      img : this.imageUrls.expire_image,
      count : '50',
      class : 'badge badge-pill badge-label-rejected',
      default : 'Campaign'
    },
    {
      name : 'Discontineud',
      img : this.imageUrls.discontineud_image,
      count : '59',
      class : 'badge badge-pill badge-label-unfinished',
      default : 'Campaign'
    },
    {
      name : 'Contract',
      img : this.imageUrls.contract_image,
      count : '45',
      class : 'badge badge-pill badge-label-finished',
      default : 'Campaign'
    },
  ]


}
