import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../common/dashboard/dashboard.service';

@Component({
  selector: 'app-complaint-dashboard',
  templateUrl: './complaint-dashboard.component.html',
  styleUrls: ['./complaint-dashboard.component.scss']
})
export class ComplaintDashboardComponent implements OnInit {

  imageUrls = {
    new_image : '../../assets/images/dashboard-card-img2.png',
    approved_image : '../../assets/images/dashboard-card-img2.png',
    pending_image : '../../assets/images/dashboard-card-img2.png',
    rejected_image : '../../assets/images/dashboard-card-img2.png'
  }

  blocks = [
    {
      name : 'New',
      img : this.imageUrls.new_image,
      count : '5890',
      class : 'badge badge-pill badge-warning',
      default : 'Complaints'
    },
    {
      name : 'Approved',
      img : this.imageUrls.approved_image,
      count : '5890',
      class : 'badge badge-pill badge-success',
      default : 'Complaints'
    },
    {
      name : 'Pending',
      img : this.imageUrls.pending_image,
      count : '5890',
      class : 'badge badge-pill badge-danger',
      default : 'Complaints'
    },
    {
      name : 'Rejected',
      img : this.imageUrls.rejected_image,
      count : '5890',
      class : 'badge badge-pill badge-danger',
      default : 'Complaints'
    },
  ]

  constructor(private dashboardService:DashboardService) {
  }

  ngOnInit(): void {
    this.sendDashboardData()
  }

  sendDashboardData(){
    this.dashboardService.DashboardEvent.emit(this.blocks);
  }

}
