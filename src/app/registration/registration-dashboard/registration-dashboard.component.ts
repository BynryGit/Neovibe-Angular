import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../common/dashboard/dashboard.service';

@Component({
  selector: 'app-registration-dashboard',
  templateUrl: './registration-dashboard.component.html',
  styleUrls: ['./registration-dashboard.component.scss']
})
export class RegistrationDashboardComponent implements OnInit {

  imageUrls = {
    new_image : '../../assets/images/dashboard-card-add-img.png',
    approved_image : '../../assets/images/dashboard-card-img2.png',
    pending_image : '../../assets/images/dashboard-card-img3.png',
    rejected_image : '../../assets/images/dashboard-card-img3.png'
  }

  blocks = [
    {
      name : 'New',
      img : this.imageUrls.new_image,
      count : '55',
      class : 'badge badge-pill badge-warning',
      default : 'Registration'
    },
    {
      name : 'Approved',
      img : this.imageUrls.approved_image,
      count : '106',
      class : 'badge badge-pill badge-success',
      default : 'Registration'
    },
    {
      name : 'Pending',
      img : this.imageUrls.pending_image,
      count : '8',
      class : 'badge badge-pill badge-danger',
      default : 'Registration'
    },
    {
      name : 'Rejected',
      img : this.imageUrls.rejected_image,
      count : '4',
      class : 'badge badge-pill badge-danger',
      default : 'Registration'
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
