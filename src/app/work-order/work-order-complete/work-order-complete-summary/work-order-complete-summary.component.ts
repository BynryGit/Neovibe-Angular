import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../common/dashboard/dashboard.service';


@Component({
  selector: 'app-work-order-complete-summary',
  templateUrl: './work-order-complete-summary.component.html',
  styleUrls: ['./work-order-complete-summary.component.scss']
})
export class WorkOrderCompleteSummaryComponent implements OnInit {

  imageUrls = {
    new_image : '../../assets/images/dashboard-card-add-img.png',
    approved_image : '../../assets/images/dashboard-card-img2.png',
    pending_image : '../../assets/images/dashboard-card-img3.png',
    rejected_image : '../../assets/images/dashboard-card-img3.png'
  }

  blocks = [
    {
      name : 'Accepted',
      img : this.imageUrls.new_image,
      count : '55',
      class : 'badge badge-pill badge-warning',
      default : 'Appointments'
    },
    {
      name : 'Pending',
      img : this.imageUrls.approved_image,
      count : '106',
      class : 'badge badge-pill badge-success',
      default : 'Appointments'
    },
    {
      name : 'Completed',
      img : this.imageUrls.pending_image,
      count : '8',
      class : 'badge badge-pill badge-danger',
      default : 'Appointments'
    },
    {
      name : 'Rejected',
      img : this.imageUrls.rejected_image,
      count : '4',
      class : 'badge badge-pill badge-danger',
      default : 'Appointments'
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
