import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { DashboardService } from '../../../common/dashboard/dashboard.service';

@Component({
  selector: 'app-billing-schedule-dashboard',
  templateUrl: './billing-schedule-dashboard.component.html',
  styleUrls: ['./billing-schedule-dashboard.component.scss']
})
export class BillingScheduleDashboardComponent implements OnInit {

  imageUrls = {
    total_image : '../../assets/images/dashboard-card-add-img.png',
    new_image : '../../assets/images/dashboard-card-img1.png',
    complete_image : '../../assets/images/dashboard-card-img2.png',
    remaining_image : '../../assets/images/dashboard-card-img3.png'
  }


  blocks = [
    {
      name : 'Total',
      img : this.imageUrls.total_image,
      count : '--',
      class : 'badge badge-pill badge-label-finished',
      default : 'Schedule'
    },
    {
      name : 'Complete',
      img : this.imageUrls.new_image,
      count : '--',
      class : 'badge badge-pill badge-label-success',
      default : 'Schedule'
    },
    {
      name : 'In Progress',
      img : this.imageUrls.complete_image,
      count : '--',
      class : 'badge badge-pill badge-label-rejected',
      default : 'Schedule'
    },
    {
      name : 'Pending',
      img : this.imageUrls.remaining_image,
      count : '--',
      class : 'badge badge-pill badge-label-pending',
      default : 'Schedule'
    },
  ]

  constructor(private dashboardService:DashboardService, private sessionService : SessionService, private apiService : ApiService) {

    if(String(this.sessionService.getter('loginUser')) == 'Tenant'){
      let tenantIdString = this.sessionService.getter("tenant_id_string");

        // Get Reading Schedule Summary API Start
        this.apiService.get('billing/bill-schedule-summary?tenant_id_string=' + tenantIdString).subscribe(
          data=>{
            if (data.state == "success") {
              this.blocks[0].count = data.result.Total_Bill_Schedule
              this.blocks[1].count = data.result.Remaining_Bill_Schedule
              this.blocks[2].count = data.result.Complete_Bill_Schedule
              this.blocks[3].count = data.result.New_Bill_Schedule
            }
          },
          error => {
            console.log(error)
            if (error.error.state == "exception") {
              alert(error.error.error)
            }else{
              console.log(error)
              alert(error.result)
            }
          }
        )
        // Get Reading Schedule Summary API End
    }else{
      let utilityIdString = this.sessionService.getter("utility_id_string");
      // Get Reading Schedule Summary API Start
      this.apiService.get('billing/bill-schedule-summary?utility_id_string=' + utilityIdString ).subscribe(
        data=>{
          if (data.state == "success") {
            this.blocks[0].count = data.result.Total_Bill_Schedule
            this.blocks[1].count = data.result.Remaining_Bill_Schedule
            this.blocks[2].count = data.result.Complete_Bill_Schedule
            this.blocks[3].count = data.result.New_Bill_Schedule
          }
        },
        error => {
          console.log(error)
          if (error.error.state == "exception") {
            alert(error.error.error)
          }else{
            console.log(error)
            alert(error.result)
          }
        }
      )
      // Get Reading Schedule Summary API End
    }

  }

  ngOnInit(): void {
    this.sendDashboardData()
  }

  sendDashboardData(){
    this.dashboardService.DashboardEvent.emit(this.blocks);
  }


}
